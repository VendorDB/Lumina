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
	import { page } from '$app/stores';
	import { verifyMail } from '$api/user';
	import { onMount } from 'svelte';

	const code = $page.url.searchParams.get('code') || '';

	let verified = false;

	onMount(() => {
		verifyMail(code)
			.then(() => {
				verified = true;
			})
			.catch((err) => {
				alert(err.message);
			});
	});
</script>

<main class="container has-text-centered">
	{#if verified}
		<h1 class="title">Success!</h1>
		<h3>You have successfully activated your account!</h3>
		<button
			class="button is-primary"
			on:click={() => {
				goto('/login');
			}}>Login</button
		>
	{:else}
		<div class="has-text-centered">
			<h1 class="title">Loading...</h1>
			<progress class="progress is-small is-primary" max="100">15%</progress>
		</div>
	{/if}
</main>

<style>
	button {
		margin-top: 1rem;
	}
</style>
