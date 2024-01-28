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
	import { page as sv_page } from '$app/stores';
	import { getReviews } from '$api/review';
	import { onMount } from 'svelte';
	import ReviewCard from '$src/lib/components/ReviewCard.svelte';
	import LoadingBar from '$src/lib/components/LoadingBar.svelte';

	export let data;

	let controls = $sv_page.url.searchParams.get('controls') == 'true' ? true : false;
	let interval = -1;

	if ($sv_page.url.searchParams.has('interval')) {
		const param = $sv_page.url.searchParams.get('interval');
		if (!isNaN(parseInt(param!!))) {
			interval = parseInt(param!!);
		}
	}

	let reviews: Review[] = [];

	let page = 1;
	let limit = 25;

	let index = 0;

	onMount(async () => {
		await loadReviews();
		if (interval > 0) {
			setInterval(next, interval);
		}
	});

	async function loadReviews() {
		const newReviews = await getReviews(data.id, page, limit, 'desc', 'created').catch(() => {});
		if (!newReviews) {
			index = -1;
		} else {
			page += 1;
			reviews = reviews.concat(newReviews!!);
		}
	}

	async function next() {
		if (reviews.length - 1 < index + 1) {
			await loadReviews();
		}
		index += 1;
	}

	function previous() {
		if (index - 1 == 0) {
			index = reviews.length - 1;
		} else {
			index -= 1;
		}
	}
</script>

{#if reviews[0]}
	<div id="wrapper" class="has-text-centered">
		{#if controls}
			<div class="navbutton" on:click={previous} on:keypress={previous} role="button" tabindex="0">
				<i class="fa-solid fa-arrow-left" />
			</div>
		{/if}
		<ReviewCard
			style="border-radius: 0;margin-bottom: 0;height:100vh;"
			displayVendor
			displayOnly
			embedded
			review={reviews[index]}
		/>
		{#if controls}
			<div class="navbutton" on:click={next} on:keypress={next} role="button" tabindex="0">
				<i class="fa-solid fa-arrow-right" />
			</div>
		{/if}
	</div>
{:else}
	<div style="padding: 1rem;">
		<LoadingBar />
	</div>
{/if}

<style>
	#wrapper {
		display: flex;
	}

	.navbutton {
		width: 5rem;
		cursor: pointer;
		position: relative;
	}

	.navbutton i {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
</style>
