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

	export let report: VendorReport;

	let profilePicture: string;

	onMount(async () => {
		if (!report.author) return;
		profilePicture = (await getProfilePicture(report.author._id)).picture;
	});

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}
</script>

<div class="report">
	{#if report && report.author && report.created && report._id}
		<div class="report-header">
			<div>
				<Base64Image
					imageData={profilePicture}
					alt="Profile Picture"
					style="width: 2rem; border-radius: 25px;"
				/>
			</div>
			{report.author.username}
			<div>
				{formatDate(report.created)}
			</div>
			<div>
				<button class="button is-danger" on:click={() => dispatch('delete', report._id)}
					><i class="fa-solid fa-trash" /></button
				>
			</div>
		</div>
		<span class="divider" />
		<div class="report-content">
			<h2 class="subtitle">{report.reason}</h2>
			{report.message}
		</div>
	{/if}
</div>

<style>
	.report {
		border-radius: 25px;
		width: 100%;
		padding: 1rem;
		margin-bottom: 1rem;
		overflow-wrap: break-word;

		display: flex;
		flex-direction: row;
	}

	.report-content {
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
		.report {
			width: 100vw;
		}
	}
</style>
