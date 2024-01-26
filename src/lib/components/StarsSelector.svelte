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
	export let selectedStars = 0;
	export let previewStars = 0;

	export const reset = () => {
		selectedStars = 0;
		previewStars = 0;
	};

	function select(stars: number) {
		previewStars = stars;
		selectedStars = stars;
	}
</script>

<div class="stars star-selector-desktop" role="button" tabindex="0" on:mouseleave={() => (previewStars = selectedStars)}>
	{#each Array.from({ length: 5 }) as _, i}
		{#if i < previewStars}
			<span
				class="icon"
				role="button"
				tabindex="0"
				on:click={() => select(i + 1)}
				on:keypress={() => select(i + 1)}
				on:mouseenter={() => (previewStars = i + 1)}
			>
				<i class="fas fa-star has-text-warning" />
			</span>
		{:else}
			<span
				class="icon"
				role="button"
				tabindex="0"
				on:click={() => select(i + 1)}
				on:keypress={() => select(i + 1)}
				on:mouseenter={() => (previewStars = i + 1)}
			>
				<i class="far fa-star has-text-warning" />
			</span>
		{/if}
	{/each}
</div>

<div class="star-selector-mobile">
	<label for="star-select" style="font-size:x-large"><i class="fas fa-star has-text-warning" /></label>
	<div class="select is-primary">
		<select id="star-select" bind:value={selectedStars}>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select>
	</div>
</div>


<style>
	.icon {
		margin-right: 5px;
		cursor: pointer;
	}

	.star-selector-mobile {
		display: none;
	}

	@media only screen and (max-width: 800px) {
		.star-selector-mobile {
			display: inline-block;
		}

		.star-selector-desktop {
			display: none;
		}
	}

</style>
