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
	import { createEventDispatcher } from 'svelte';
	import Base64Image from './Base64Image.svelte';

	export let imageData: string | undefined = undefined;

	const dispatch = createEventDispatcher()

	function openFilePicker() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/jpeg,image/png,image/gif,image/bmp';
		input.addEventListener('change', handleFileSelection);
		input.click();
	}

	function handleFileSelection(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files) return;
		const file = input.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (!e.target) return;
				imageData = e.target.result as string;
				dispatch('pick', imageData)
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="image-picker-container">
	{#if imageData}
		<Base64Image {imageData} alt="Picker" style="width: 5rem" />
	{:else}
		<img src="/assets/logo-compact-256x256.png" alt="Picker" style="width: 5rem;">
	{/if}
	<span
		class="edit-icon"
		role="button"
		tabindex="0"
		on:click={openFilePicker}
		on:keypress={openFilePicker}>✏️</span
	>
</div>

<style>
	.image-picker-container {
		position: relative;
		display: inline-block;
	}

	.edit-icon {
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 50%;
		padding: 4px;
		cursor: pointer;
	}

	/* Add some styling for the hover effect */
	.image-picker-container:hover .edit-icon {
		background-color: grey;
	}
</style>

