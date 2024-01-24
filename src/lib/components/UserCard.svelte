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
	import { updateUserAdmin, deleteUser } from '$api/admin/user';
	import { banUser } from '$api/moderator/user';
	import Modal from './Modal.svelte';
	import Base64Image from './Base64Image.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let user: User;
	export let admin: boolean = false;
	export let moderator: boolean = false;

	let permValue: string;
	let banReason: string;

	let banConfirmModal: Modal;
	let deleteConfirmModal: Modal;

	function updatePerms() {
		updateUserAdmin(user._id, {
			perms: parseInt(permValue)
		});
	}

	function prepareBanUser() {
		if (!banReason || banReason.trim() == '' || banReason.length < 5) {
			alert('Invalid Reason');
		} else {
			banUser(user._id, banReason).then(() => dispatch('reload'));
		}
	}
</script>

<div class="card has-background-dark">
	<div class="card-image">
		<figure class="image is-4by3">
			<Base64Image
				imageData={user.profile_picture}
				alt={user.username}
				style="object-fit: contain;"
			/>
		</figure>
	</div>
	<div class="card-content">
		<p class="card-title has-text-white">{user.username}</p>

		<div class="content has-text-white">
			{user.about}
		</div>

		{#if admin}
			<div class="select is-primary">
				<select bind:value={permValue} on:change={updatePerms}>
					<option value="0" selected={user.perms == 0}>User</option>
					<option value="1" selected={user.perms == 1}>Moderator</option>
					<option value="2" selected={user.perms == 2}>Admin</option>
				</select>
			</div>

			<button class="button is-danger" on:click={deleteConfirmModal.open}>
				<i class="fa-solid fa-trash" />
			</button>
		{/if}

		{#if moderator || admin}
			<button class="button is-danger" on:click={banConfirmModal.open}>
				<i class="fa-solid fa-hammer" />
			</button>
		{/if}
	</div>
</div>

<Modal
	title="Delete User"
	buttons={['cancel', 'confirm']}
	bind:this={deleteConfirmModal}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') {
			deleteUser(user._id).then(() => dispatch('reload'));
		}
	}}
>
	Are you sure you want to delete <strong>{user.username}</strong>?
</Modal>

<Modal
	title="Ban User"
	buttons={['cancel', 'confirm']}
	bind:this={banConfirmModal}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') prepareBanUser();
	}}
>
	Are you sure you want to ban <strong>{user.username}</strong>?

	<input type="text" bind:value={banReason} placeholder="Reason" class="input is-danger" />
</Modal>

<style>
	.card {
		margin: 1rem;
		width: 300px; /* Adjust as needed */
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}

	.card-title {
		font-size: 1.25rem;
		max-width: 100%; /* Allow the title to expand */
		overflow: hidden;
		white-space: nowrap; /* Prevent line breaks */
		text-overflow: ellipsis; /* Show ellipsis (...) if text overflows */
	}

	.card-image {
		padding: 1rem;
	}
</style>
