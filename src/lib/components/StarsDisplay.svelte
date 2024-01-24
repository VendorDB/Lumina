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
	export let stars = 0
</script>

<div class="stars">
	{#each Array.from({ length: 5 }) as _, i}
		{#if i < Math.floor(stars)}
			<span class="icon">
				<i class="fas fa-star has-text-warning" />
			</span>
		{:else if i + 0.5 <= stars && stars != 0}
			<span class="icon">
				<i class="fas fa-star-half has-text-warning" />
			</span>
		{:else}
			<span class="icon">
				<i class="far fa-star has-text-warning" />
			</span>
		{/if}
	{/each}
</div>