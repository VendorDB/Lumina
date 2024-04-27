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
	import { goto } from '$app/navigation';
	import { login } from '$api/user';
	import { user as userStore } from '$lib/stores';
	import Modal from '$lib/components/Modal.svelte';

	let email = '';
	let password = '';
	let totpToken: string | undefined;
	let totpTokenInput: HTMLInputElement;
	let totpModal: Modal;

	function submit() {
		login(email, password, totpToken)
			.then((data) => {
				userStore.set(data.user);
				goto('/');
			})
			.catch((err) => {
				if (err.error == 'TOTP_REQUIRED') {
					totpModal.open();
					totpTokenInput.focus()
				} else {
					alert(err.message);
				}
			});
		totpToken = undefined;
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Login</h1>
	<h2 class="subtitle">Don't have an account yet? <a href="/signup">Sign up</a>!</h2>

	<form on:submit={submit}>
		<div class="field">
			<label for="email" class="label">Email Address</label>
			<div class="control">
				<input
					id="email"
					class="input"
					type="email"
					placeholder="Your email address"
					bind:value={email}
				/>
			</div>
		</div>

		<div class="field">
			<label for="password" class="label">Password</label>
			<div class="control">
				<input
					id="password"
					class="input"
					type="password"
					placeholder="Your password"
					bind:value={password}
				/>
			</div>
		</div>

		<button class="button is-primary" type="submit"> Login </button>
	</form>
</main>

<Modal
	bind:this={totpModal}
	title="2FA"
	buttons={['cancel', 'confirm']}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') {
			submit();
		} else {
			totpToken = undefined;
		}
	}}
>
	<h1 class="title">Enter your 2FA Code</h1>
	<form on:submit={submit}>
		<input
			bind:this={totpTokenInput}
			bind:value={totpToken}
			id="totp-code"
			type="text"
			class="input"
			placeholder="123456"
			max="6"
		/>
	</form>
</Modal>

<svelte:head>
	<title>VendorDB | Login</title>
</svelte:head>
