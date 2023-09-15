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
	import { getVendor, getReviews } from '$lib/api';
	import { onMount } from 'svelte';
	import StarsDisplay from '$lib/components/StarsDisplay.svelte';
	import Base64Image from '$lib/components/Base64Image.svelte';

	export let data;

	let vendor: Vendor;
	let reviews: Review[] = [];

	let reviewsPage = 0

	onMount(async () => {
		vendor = await getVendor(data.id);
		loadReviews()
	});

	async function loadReviews() {
		reviewsPage += 1
		reviews = reviews.concat(await getReviews(data.id, reviewsPage, 10))
	}

</script>

<main class="container has-text-centered">
	{#if vendor}
		<div id="header" class="section">
			<Base64Image imageData={vendor.logo} alt="Logo" style="width: 10rem" />
			<h1 class="title">{vendor.name}</h1>
			<h2 class="subtitle">{vendor.description}</h2>
		</div>

		<div id="reviews" class="section">
			<h1 class="title">Reviews</h1>
			<strong>Average ({vendor.starsAverage || 0})</strong> <StarsDisplay stars={vendor.starsAverage} />

			{#each reviews as review}
				{review.message}
			{/each}

		</div>
	{/if}
</main>
