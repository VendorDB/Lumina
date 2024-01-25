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
	import CountrySelector from './CountrySelector.svelte';
	import Modal from './Modal.svelte';

	let filterModal: Modal;

	let name: string | undefined;
	let minAverageRating = 0;
	let country: Country;

	const dispatch = createEventDispatcher();

	function applyFilters() {
		if (name && name.trim() == '') name = undefined;
		const filterData = {
			name,
			description: name,
			minAverageRating,
			country: country?.value || undefined
		};
		dispatch('filtersApplied', filterData);
	}

</script>

<div>
	<button
		class="button is-rounded is-primary"
		on:click={filterModal.open}
	>
		<i class="fas fa-sliders" />&nbsp; Filter
	</button>
</div>

<Modal bind:this={filterModal} title="Vendor Filter" buttons={['cancel', 'confirm']} on:buttonClick={(event) => {
	if(event.detail == 'confirm') {
		applyFilters()
	}
}}>
	<div class="filter-panel">
		<form class="compact-menu">
			<div class="field">
				<label class="label" for="name-control">Name</label>
				<div class="control" id="name-control">
					<input class="input" type="text" bind:value={name} />
				</div>
			</div>

			<div class="field">
				<label class="label" for="country-control">Country</label>
				<div class="control" id="country-control">
					<CountrySelector bind:selected={country} />
				</div>
			</div>

			<div class="field">
				<label class="slider-label" for="rating-control">
					Min Average Rating:
					<span class="slider-value">{minAverageRating.toFixed(1)}</span>
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
</Modal>

<style>
	.filter-panel {
		color: #ffffff;
		padding: 1rem;
		border-radius: 0.5rem;
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
