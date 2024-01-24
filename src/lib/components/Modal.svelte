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

	type ButtonOption = 'close' | 'abort' | 'cancel' | 'confirm' | 'ok';

	export let title: string;
	export let buttons: ButtonOption[];

	let modal: HTMLDivElement;

	const dispatch = createEventDispatcher();

	export const toggle = () => {
		modal.classList.toggle('is-active')
	};

	export const open = () => {
		if(!modal.classList.contains('is-active')){
			modal.classList.add('is-active')
		}
	};

	export const close = () => {
		if(modal.classList.contains('is-active')){
			modal.classList.remove('is-active')
		}
	};

	function handleButtonClick(buttonType: string) {
		close()
		dispatch('buttonClick', buttonType)
	}
</script>

<div class="modal" bind:this={modal}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{title}</p>
		</header>
		<section class="modal-card-body">
			<slot />
		</section>
		<footer class="modal-card-foot">
			<span class="footerSpacer" />
			{#each buttons as buttonType}
				{#if buttonType == 'abort'}
					<button class="button is-danger" on:click={() => handleButtonClick(buttonType)}
						>Abort</button
					>
				{:else if buttonType == 'cancel'}
					<button class="button is-danger" on:click={() => handleButtonClick(buttonType)}
						>Cancel</button
					>
				{:else if buttonType == 'close'}
					<button class="button is-danger" on:click={() => handleButtonClick(buttonType)}
						>Close</button
					>
				{:else if buttonType == 'confirm'}
					<button class="button is-success" on:click={() => handleButtonClick(buttonType)}
						>Confirm</button
					>
				{:else if buttonType == 'ok'}
					<button class="button is-success" on:click={() => handleButtonClick(buttonType)}
						>Ok</button
					>
				{/if}
			{/each}
		</footer>
	</div>
</div>

<style>
	footer {
		display: flex;
	}

	.footerSpacer {
		flex-grow: 1
	}
</style>
