<!--
 Copyright (C) 2023 Marcus Huber (xenorio) <dev@xenorio.xyz>
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
	import { user } from '$lib/stores';
	import Modal from '$lib/components/Modal.svelte';
	import QRCode from '$lib/components/QRCode.svelte';
	import { totpGenSecret, totpVerify, totpSet, totpDisable } from '$api/totp';
	import { fetchMe, genAPIKey } from '$api/user';

	let currentPassword: string;
	let newPassword: string;
	let newPasswordConfirm: string;

	let totpModal: Modal;
	let totpDisableModal: Modal;
	let totpQr: QRCode;
	let totpSecret: string;
	let totpToken: string;
	let totpTokenInput: HTMLInputElement;
	let totpUrl: string;

	let keyConfirmModal: Modal;
	let keyModal: Modal;
	let apiKey: string;
	let keyDisplay: HTMLInputElement;

	function changePassword() {
		if (newPassword != newPasswordConfirm) {
			alert('Passwords do not match');
		}

		currentPassword = '';
		newPassword = '';
	}

	function disableTotp(confirmed?: boolean) {
		if (confirmed) {
			totpDisable().then(async () => {
				user.set(await fetchMe());
			});
		} else {
			totpDisableModal.open();
		}
	}

	function enableTotp() {
		if (!$user) return;
		totpGenSecret($user.email).then((data) => {
			totpSecret = data.secret;
			totpUrl = data.uri;
			totpQr.set(totpUrl);
			totpModal.open();
			totpTokenInput.focus()
		});
	}

	function verifyTotp() {

		totpModal.close()

		if (!totpToken || totpToken.length < 6) {
			alert('Invalid Token');
			totpToken = '';
			return;
		}

		totpVerify(totpToken, totpSecret).then(async (data) => {
			totpToken = '';

			if (!data.valid) {
				alert('Invalid Token');
				return;
			}

			await totpSet(totpSecret);

			user.set(await fetchMe());
		});
	}
</script>

<main class="container has-text-centered">
	{#if $user}
		<h1 class="title">Security Settings</h1>
		<div class="section security-settings-section">
			<h1 class="title">Change Password</h1>
			<form on:submit={changePassword}>
				<div class="field">
					<label for="password-current" class="label">Current Password</label>
					<div class="control">
						<input
							id="password-current"
							class="input"
							type="password"
							bind:value={currentPassword}
						/>
					</div>
				</div>

				<div class="field">
					<label for="password-new" class="label">New Password</label>
					<div class="control">
						<input id="password-new" class="input" type="password" bind:value={newPassword} />
					</div>
				</div>

				<div class="field">
					<label for="password-new-confirm" class="label">Confirm New Password</label>
					<div class="control">
						<input
							id="password-new-confirm"
							class="input"
							type="password"
							bind:value={newPasswordConfirm}
						/>
					</div>
				</div>

				<button type="submit" class="button is-primary">Save</button>
			</form>
		</div>

		<div class="section security-settings-section">
			<h1 class="title">2FA</h1>

			{#if $user.totpEnabled}
				<button class="button is-danger" on:click={() => disableTotp()}>Disable 2FA</button>
			{:else}
				<button class="button is-primary" on:click={enableTotp}>Enable 2FA</button>
			{/if}
		</div>

		<div class="section security-settings-section">
			<h1 class="title">API Key</h1>

			<button class="button is-primary" on:click={keyConfirmModal.open}>Generate new API key</button
			>
		</div>
	{/if}
</main>

<Modal
	title="Generate API Key"
	bind:this={keyConfirmModal}
	buttons={['cancel', 'confirm']}
	on:buttonClick={async (event) => {
		if (event.detail == 'confirm') {
			apiKey = (await genAPIKey()).token;
			keyModal.open();
		}
	}}
>
	Are you sure you want to generate a new API key? Any previous key will be invalidated!
</Modal>

<Modal
	title="API Key"
	bind:this={keyModal}
	buttons={['ok']}
	on:buttonClick={() => {
		apiKey = '';
	}}
>
	Here's your new API key:
	<div style="margin-top: 0.5rem;margin-bottom: 0.5rem;display: flex;">
		<input bind:this={keyDisplay} class="input is-danger" type="text" readonly value={apiKey} />
		<button style="margin-left: 0.5rem;" class="button is-primary" title="Copy" on:click={() => {
			keyDisplay.select()
			keyDisplay.setSelectionRange(0, 99999)
			navigator.clipboard.writeText(apiKey)
		}}><i class="fa-solid fa-copy" /></button>
	</div>
	<strong>DO NOT SHARE THIS WITH ANYONE!</strong>
</Modal>

<Modal
	bind:this={totpModal}
	title="Enable 2FA"
	buttons={['cancel', 'confirm']}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') verifyTotp();
	}}
>
	<h2 class="subtitle" style="margin-bottom: 0.25rem;">Scan this code with any 2FA application</h2>
	<ul style="margin-bottom: 0.5rem;">
		<li>
			<strong>Android:</strong>
			<a href="https://getaegis.app/" target="_blank" rel="noreferrer">Aegis Authenticator</a>
		</li>
		<li>
			<strong>iOS:</strong>
			<a href="https://tofuauth.com/" target="_blank" rel="noreferrer">Tofu</a>
		</li>
	</ul>
	<QRCode bind:this={totpQr} />

	<form on:submit={() => verifyTotp()}>
		<div>
			<label for="totp-code">Enter your 2FA Code</label>
			<input
				bind:this={totpTokenInput}
				bind:value={totpToken}
				id="totp-code"
				type="text"
				class="input"
				placeholder="123456"
				max="6"
			/>
		</div>
	</form>
</Modal>

<Modal
	bind:this={totpDisableModal}
	title="Disable 2FA"
	buttons={['cancel', 'confirm']}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') disableTotp(true);
	}}
>
	<h2 class="subtitle" style="margin-bottom: 0.25rem;">Do you really want to disable 2FA?</h2>
</Modal>

<style>
	.security-settings-section {
		padding: 1rem;
		border-radius: 25px;
		margin-bottom: 2rem;
	}
</style>
