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
	import { updateUser, fetchMe, deleteAccount } from '$api/user';
	import ImagePicker from '$lib/components/ImagePicker.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { goto } from '$app/navigation';

	let username = $user?.username;
	let profile_picture = $user?.profile_picture;
	let about = $user?.about;

	let deleteConfirmModal: Modal;

	function submit() {
		updateUser({
			username,
			profile_picture,
			about
		}).then(() => {
			fetchMe().then((newUser) => {
				user.set(newUser);
			});
			alert('Successfully Saved');
		});
	}

	function resizeAboutMe(event: Event) {
		const textarea = event.target as HTMLTextAreaElement;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Profile Settings</h1>

	{#if $user}
		<form on:submit={submit}>
			<div class="field">
				<label for="profile-picture" class="label">Profile Picture</label>
				<ImagePicker
					on:pick={(event) => {
						profile_picture = event.detail;
					}}
					imageData={$user.profile_picture}
				/>
			</div>

			<div class="field">
				<label for="username" class="label">Username</label>
				<div class="control">
					<input
						id="username"
						class="input"
						type="text"
						placeholder={$user.username}
						bind:value={username}
					/>
				</div>
			</div>

			<div class="field">
				<label for="about" class="label">About Me</label>
				<div class="control">
					<textarea
						id="about"
						class="input"
						placeholder={$user.about}
						bind:value={about}
						style="height: auto; overflow-y: hidden; resize: none;"
						on:input={resizeAboutMe}
					/>
				</div>
			</div>

			<button class="button is-primary" type="submit"> Save </button>
		</form>

		<hr />

		<button class="button is-danger" on:click={() => deleteConfirmModal.open()}
			><i class="fa-solid fa-trash-can" />&nbsp;Delete Account</button
		>
	{/if}
</main>

<Modal
	title="Confirm Deletion"
	bind:this={deleteConfirmModal}
	buttons={['cancel', 'confirm']}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') {
			deleteAccount();
			user.set(null);
			goto('/');
		}
	}}
>
	Do you really want to delete your account? <br /><br />
	This will <strong>irrecoverably</strong> get rid of all your account data and reviews!
</Modal>
