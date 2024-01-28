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
	import { getVendor } from '$api/vendor';
	import { onMount } from 'svelte';
	import StarsDisplay from '$src/lib/components/StarsDisplay.svelte';
	import Base64Image from '$src/lib/components/Base64Image.svelte';

	export let data;

	let vendor: Vendor;
	let averageStars = "0";

	onMount(async () => {
		vendor = await getVendor(data.id);

		const preAverageStars = vendor.stars / vendor.reviewAmount

		if(!isNaN(preAverageStars)){
			averageStars = preAverageStars.toFixed(1)
		}
	});
</script>

{#if vendor}
	<div class="card has-text-centered has-background-dark">
		<div class="card-image">
			<Base64Image imageData={vendor.logo} alt="Logo" style="width: 5rem;" />
		</div>
		<div class="card-content">
			<p class="card-title">{vendor.name}</p>
			<StarsDisplay stars={vendor.stars / vendor.reviewAmount} />
			<div style="margin-bottom: 0.5rem;">
				{averageStars} stars from {vendor.reviewAmount} {vendor.reviewAmount == 1 ? 'review' : 'reviews'}
			</div>
			<a href={`/vendors/${vendor._id}`} target="_blank">
				<button class="button is-primary">View on VendorDB&nbsp;<i class="fa-solid fa-up-right-from-square" /></button>
			</a>
		</div>
	</div>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		cursor: pointer;
		color: white;
	}

	.card-content {
		padding: 0;
		margin-bottom: 1rem;
	}

	.card-title {
		font-size: 1.25rem;
		max-width: 100%; /* Allow the title to expand */
		overflow: hidden;
		white-space: nowrap; /* Prevent line breaks */
		text-overflow: ellipsis; /* Show ellipsis (...) if text overflows */
	}
</style>
