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
	import { listHeldReviews, unholdReview } from '$api/moderator/review';
	import { onMount } from 'svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';

	let currentReview: Review;

	onMount(async () => {
		next();
	});

	function next() {
		listHeldReviews(1, 1).then((reviews) => {
			currentReview = reviews[0] || undefined;
		});
	}

	function accept() {
		unholdReview(currentReview._id, 'ACCEPT').then(() => {
			next();
		});
	}

	function deny() {
		unholdReview(currentReview._id, 'DENY').then(() => {
			next();
		});
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Held Reviews</h1>

	{#if currentReview}
		<div class="card-container" style="justify-content: left;">
			<ReviewCard review={currentReview} displayOnly />
		</div>

		<div class="descision-buttons">
			<button class="button is-danger" on:click={deny}>
				<i class="fa-solid fa-xmark" />
			</button>
			<span style="width: 1rem;" />
			<button class="button is-success" on:click={accept}>
				<i class="fa-solid fa-check" />
			</button>
		</div>
	{:else}
		<h2 class="subtitle">No reviews here :)</h2>
	{/if}
</main>

<style>
	.descision-buttons {
		display: flex;
	}

	.descision-buttons button {
		flex-grow: 1;
	}
</style>
