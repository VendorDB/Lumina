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
	import { getVendorRequests, deleteVendorRequest } from '$api/admin/vendor';
	import { onMount } from 'svelte';
	import VendorRequestCard from '$lib/components/VendorRequestCard.svelte';

	let requests: VendorRequest[] = [];
	let page = 1;

	onMount(async () => {
		window.addEventListener('scroll', function () {
			if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
				loadRequests();
			}
		});

		loadRequests();
	});

	function loadRequests() {
		getVendorRequests(page, 25).then((newRequests) => {
			if (newRequests.length < 1) return;
			requests = requests.concat(newRequests);
			page += 1;
		});
	}

	function reloadRequests() {
		page = 1;
		requests = [];
		loadRequests();
	}
</script>

<main class="container has-text-centered">

	<h1 class="title">Vendor Requests</h1>

	{#if requests}
		{#each requests as request}
			<VendorRequestCard {request} on:delete={event => {
				deleteVendorRequest(event.detail)
					.then(() => {
						reloadRequests()
					})
			}}/>
		{/each}
	{/if}
</main>
