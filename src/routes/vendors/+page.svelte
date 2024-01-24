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
	import { onMount } from 'svelte';
	import { getVendors } from '$api/vendor';
	import { user } from '$lib/stores';
	import VendorCard from '$lib/components/VendorCard.svelte';
	import Paginator from '$lib/components/Paginator.svelte';
	import VendorFilterMenu from '$lib/components/VendorFilterMenu.svelte';

	let vendors: any;

	let page = 1;
	let limit = 25;
	let filter = {};

	let totalPages: number;
	let totalCount: number;

	onMount(() => {
		update();
	});

	async function update() {
		getVendors(filter, page, limit).then((result) => {
			console.log(result);
			vendors = result.vendors;
			totalPages = result.totalPages;
			totalCount = result.totalCount;
		});
	}

	function handlePaginatorSwitch(event: any) {
		page = event.detail.page;
		update();
	}

	function handleFiltersApplied(event: any) {
		filter = event.detail;
		update();
	}
</script>

<main class="container has-text-centered">
	{#if vendors}
		<h1 class="title">Vendors</h1>

		<VendorFilterMenu on:filtersApplied={handleFiltersApplied} />

		{#if totalCount > 0}
			<div style="margin-top: 1rem;">{totalCount} results</div>

			<div class="card-container" style="margin-bottom: 2rem;">
				{#each vendors as vendor}
					<VendorCard {vendor} />
				{/each}
			</div>
			<Paginator {totalPages} on:switch={handlePaginatorSwitch} />
		{:else}
			<h1 class="title">Sorry, there are no results!</h1>
		{/if}
	{/if}

	{#if $user}
		<h2 class="subtitle">
			Can't find the vendor you're looking for? <a href="/vendors/request">Request it!</a>
		</h2>
	{/if}
</main>

<svelte:head>
	<title>VendorDB | Vendors</title>
</svelte:head>
