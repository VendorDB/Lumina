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
	import { goto } from '$app/navigation';
	import { updateVendor } from '$api/admin/vendor';
	import { getVendor } from '$api/vendor';
	import ImagePicker from '$lib/components/ImagePicker.svelte';
	import { onMount } from 'svelte';
	import CountrySelector from '$lib/components/CountrySelector.svelte';

	export let data;

	let name: string;
	let description: string;
	let logo: string;
	let url: string;
	let country: Country | undefined;

	onMount(() => {
		getVendor(data.id).then((vendor) => {
			name = vendor.name;
			description = vendor.description;
			logo = vendor.logo;
			url = vendor.url;
			country = vendor.country;
		});
	});

	function submit() {
		updateVendor(data.id, {
			name,
			description,
			logo,
			url,
			country: country || false
		}).then(() => {
			goto(`/vendors/${data.id}`);
		});
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Edit Vendor</h1>

	<form on:submit={submit}>
		<div class="field">
			<label for="logo" class="label">Logo</label>
			<ImagePicker
				on:pick={(event) => {
					logo = event.detail;
				}}
				imageData={logo}
			/>
		</div>

		<div class="field">
			<label for="name" class="label">Name</label>
			<div class="control">
				<input id="name" class="input" type="text" bind:value={name} />
			</div>
		</div>

		<div class="field">
			<label for="description" class="label">Description</label>
			<div class="control">
				<textarea
					id="description"
					class="input"
					bind:value={description}
					style="height: auto; overflow-y: hidden; resize: none;"
				/>
			</div>
		</div>

		<div class="field">
			<label for="url" class="label">URL</label>
			<div class="control">
				<input class="input" id="url" type="url" bind:value={url} />
			</div>
		</div>

		<div class="field">
			<label for="country" class="label">Country</label>
			<div class="control">
				<CountrySelector bind:selected={country} />
			</div>
		</div>

		<button class="button is-primary" type="submit"> Save </button>

	</form>
</main>
