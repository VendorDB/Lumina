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
	import StarsDisplay from '$lib/components/StarsDisplay.svelte';
	import { createEventDispatcher } from 'svelte';
	import Base64Image from './Base64Image.svelte';

	export let vendor: Vendor;
	export let admin: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<div
	class="card has-background-dark"
	role="button"
	tabindex="0"
	on:click={() => {
		if (!admin) goto(`/vendors/${vendor._id}`);
	}}
	on:keypress={() => {
		if (!admin) goto(`/vendors/${vendor._id}`);
	}}
>
	<div class="card-image">
		<figure class="image is-4by3">
			<Base64Image imageData={vendor.logo} alt={vendor.name} style="object-fit: contain;" />
		</figure>
	</div>
	<div class="card-content">
		<p class="card-title has-text-white">{vendor.name}</p>

		<StarsDisplay stars={vendor.stars / vendor.reviewAmount} />

		<div class="content has-text-white">
			{vendor.description}
		</div>

		{#if admin}
			<button
				class="button is-info"
				on:click={() => {
					dispatch('adminAction', {type: 'edit', vendor});
				}}><i class="fa-solid fa-pen" /></button
			>
			<button
				class="button is-danger"
				on:click={() => {
					dispatch('adminAction', {type: 'delete', vendor});
				}}><i class="fa-solid fa-trash" /></button
			>
		{/if}
	</div>
</div>

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
