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
	import { updateUser, fetchMe } from '$lib/api';
	import Base64Image from '$lib/components/Base64Image.svelte';

	let username = $user?.username;
	let profile_picture: string | undefined;
	let about = $user?.about;

	function openFilePicker() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/jpeg,image/png,image/gif,image/bmp';
		input.addEventListener('change', handleFileSelection);
		input.click();
	}

	function handleFileSelection(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files) return;
		const file = input.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (!e.target) return;
				profile_picture = e.target.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

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
				<div class="profile-picture-container">
					<Base64Image
						imageData={profile_picture || $user.profile_picture}
						alt="Profile Picture"
						style="width: 5rem"
					/>
					<span
						class="edit-icon"
						role="button"
						tabindex="0"
						on:click={openFilePicker}
						on:keypress={openFilePicker}>✏️</span
					>
				</div>
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
	{/if}
</main>

<style>
	.profile-picture-container {
		position: relative;
		display: inline-block;
	}

	.edit-icon {
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 50%;
		padding: 4px;
		cursor: pointer;
	}

	/* Add some styling for the hover effect */
	.profile-picture-container:hover .edit-icon {
		background-color: grey;
	}
</style>
