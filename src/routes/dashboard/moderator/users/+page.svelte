<!--
 Copyright (C) 2024 Marcus Huber (xenorio) <dev@xenorio.xyz>
 
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
	import { searchUsers } from '$api/admin/user';
	import { onMount } from 'svelte';
	import UserCard from '$lib/components/UserCard.svelte';

	let users: User[] = [];
	let page = 1;
	let nameFilter: string;

	let nameFilterInput: string;

	onMount(async () => {

		window.addEventListener('scroll', function () {
			if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
				loadUsers();
			}
		});

		loadUsers();
	});

	function loadUsers() {
		searchUsers(page, 25, nameFilter).then((newUsers) => {
			if (newUsers.length < 1) return;
			users = users.concat(newUsers);
			page += 1;
		});
	}

	function reloadUsers() {
		page = 1;
		users = [];
		loadUsers();
	}

	function setFilter() {
		nameFilter = nameFilterInput;
		reloadUsers();
		nameFilterInput = '';
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Users</h1>

	<form class="namefilter" on:submit={setFilter}>
		<input type="text" class="input is-primary" bind:value={nameFilterInput} placeholder="Name" />
		<button class="button is-primary" type="submit"><i class="fa-solid fa-paper-plane" /></button>
	</form>

	{#if users && users.length > 0}
		<div class="card-container" style="justify-content: left;">
			{#each users as user}
				<UserCard {user} moderator on:reload={reloadUsers} />
			{/each}
		</div>
	{/if}
</main>

<style>
	.namefilter {
		display: flex;
	}

	.namefilter button {
		margin-left: 0.25rem;
	}
</style>
