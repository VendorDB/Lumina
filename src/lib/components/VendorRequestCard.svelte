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
	import { createEventDispatcher, onMount } from 'svelte';
	import { getProfilePicture } from '$api/user';
	import Base64Image from './Base64Image.svelte';

	const dispatch = createEventDispatcher();

	export let request: VendorRequest;

	let profilePicture: string;

	onMount(async () => {
		if (!request.author) return;
		profilePicture = (await getProfilePicture(request.author._id)).picture;
	});

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}
</script>

<div class="request">
	{#if request && request.author && request.created && request._id}
		<div class="request-header">
			<div>
				<Base64Image
					imageData={profilePicture}
					alt="Profile Picture"
					style="width: 2rem; border-radius: 25px;"
				/>
			</div>
			{request.author.username}
			<div>
				{formatDate(request.created)}
			</div>
			<div>
				<button class="button is-danger" on:click={() => dispatch('delete', request._id)}
					><i class="fa-solid fa-trash" /></button
				>
			</div>
		</div>
		<span class="divider" />
		<div class="request-content">
			<h2 class="subtitle">{request.name}</h2>
			<a href={request.url} target="_blank" rel="noreferrer">{request.url}</a>
		</div>
	{/if}
</div>

<style>
	.request {
		border-radius: 25px;
		width: 100%;
		padding: 1rem;
		margin-bottom: 1rem;
		overflow-wrap: break-word;

		display: flex;
		flex-direction: row;
	}

	.request-content {
		overflow-wrap: break-word;
		width: 100%;
	}

	.divider {
		border-left: 2px solid grey;
		min-height: 100%;
		width: 2px;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	@media only screen and (max-width: 600px) {
		.request {
			width: 100vw;
		}
	}
</style>
