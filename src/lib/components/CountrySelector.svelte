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
	import countries from 'world-countries';
	import Select from 'svelte-select/Select.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher()

	const items: Country[] = []

	items.push({
		label: '🇪🇺 European Union',
		value: 'EU',
		flag: '🇪🇺',
		name: 'European Union'
	})

	for(let country of countries) {
		items.push({
			label: `${country.flag} ${country.name.common}`,
			value: country.cca2,
			flag: country.flag,
			name: country.name.common
		})
	}

	items.sort((a, b) => {
		return (a.name > b.name) ? 1 : -1
	})

	export let selected: Country | null = null;
</script>

<div class="country-select">
	<Select bind:value={selected} {items} placeholder="Select Country" on:change={(event) => {
		dispatch('change', event.detail)
	}}/>
</div>

<style>
	.country-select {
		color: black
	}
</style>
