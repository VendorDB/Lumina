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
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let totalPages: number;
	export let page = 1;

	let pageNumbers = getPageRange();

	export const setPages = (pages: number) => {
		totalPages = pages;
		pageNumbers = getPageRange();
	};

	function goToPage(newPage: number) {
		if(newPage > totalPages || newPage < 1)return
		page = newPage;
		dispatch('switch', {
			page
		});
	}

	function getPageRange() {
		const maxPagesToShow = 5; // Maximum number of page numbers to show
		const halfMax = Math.floor(maxPagesToShow / 2);

		let start = Math.max(1, page - halfMax);
		let end = Math.min(totalPages, start + maxPagesToShow - 1);

		if (end - start + 1 < maxPagesToShow) {
			start = Math.max(1, end - maxPagesToShow + 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}
</script>

<nav class="pagination is-centered is-rounded" aria-label="pagination">
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<a class="pagination-previous" on:click={() => goToPage(1)}>First</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<a class="pagination-previous" on:click={() => goToPage(page - 1)}>Previous</a>

	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<a class="pagination-next" on:click={() => goToPage(page + 1)}>Next</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<a class="pagination-next" on:click={() => goToPage(totalPages)}>Last</a>

	<ul class="pagination-list">
		{#each pageNumbers as pageNum}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					class="pagination-link {pageNum == page ? 'is-current' : ''}"
					on:click={() => goToPage(pageNum)}>{pageNum}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.pagination,
	.pagination-link,
	.pagination-previous,
	.pagination-next {
		color: white;
	}
</style>
