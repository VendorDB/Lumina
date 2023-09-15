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

	let isFilterVisible = false;
	let name = '';
	let minAverageRating = 0;

	const dispatch = createEventDispatcher();

	function applyFilters() {
		const filterData = {
			name,
			description: name,
			minAverageRating
		};
		dispatch('filtersApplied', filterData);
	}

	function handleButton() {
		if (isFilterVisible) {
			applyFilters();
		}

		isFilterVisible = !isFilterVisible;
	}
</script>

<div>
	<button
		class="button is-rounded {isFilterVisible ? 'is-primary' : 'is-info'}"
		on:click={handleButton}
	>
		{#if isFilterVisible}
			<i class="fas fa-check" />&nbsp; Apply
		{:else}
			<i class="fas fa-sliders" />&nbsp; Filter
		{/if}
	</button>
</div>

<div class="filter-panel {isFilterVisible ? 'show-panel' : ''}">
	<form class="compact-menu" on:submit={handleButton}>
		<div class="field">
			<label class="label" for="name-control">Name</label>
			<div class="control" id="name-control">
				<input class="input" type="text" bind:value={name} />
			</div>
		</div>

		<div class="field">
			<label class="slider-label" for="rating-control">
				Min Average Rating:
				<span class="slider-value">{minAverageRating}</span>
			</label>
			<input
				class="slider control is-fullwidth"
				id="rating-control"
				type="range"
				min="0"
				max="5"
				step="0.1"
				bind:value={minAverageRating}
			/>
		</div>
	</form>
</div>

<style>
	.filter-panel {
		background-color: #252525;
		color: #ffffff;
		padding: 1rem;
		border-radius: 0.5rem;
		display: none;
	}

	.show-panel {
		display: block;
	}

	.compact-menu {
		display: flex;
		flex-direction: column; /* Change flex-direction to column */
		align-items: stretch; /* Add this line */
	}

	.slider-label {
		margin-right: 0.5rem;
	}

	.slider-value {
		color: #48c774;
		font-weight: bold;
	}

	.slider {
		width: 80%;
	}
</style>
