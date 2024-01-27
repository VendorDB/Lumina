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
	import { getVendorReports, deleteVendorReport } from '$api/admin/vendor';
	import { onMount } from 'svelte';
	import VendorReportCard from '$lib/components/VendorReportCard.svelte';

	let reports: VendorReport[] = [];
	let page = 1;

	onMount(async () => {
		window.addEventListener('scroll', function () {
			if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
				loadReports();
			}
		});

		loadReports();
	});

	function loadReports() {
		getVendorReports(page, 25).then((newReports) => {
			if (newReports.length < 1) return;
			reports = reports.concat(newReports);
			page += 1;
		});
	}

	function reloadReports() {
		page = 1;
		reports = [];
		loadReports();
	}
</script>

<main class="container has-text-centered">

	<h1 class="title">Vendor Reports</h1>

	{#if reports}
		{#each reports as report}
			<VendorReportCard {report} on:delete={event => {
				deleteVendorReport(event.detail)
					.then(() => {
						reloadReports()
					})
			}}/>
		{/each}
	{/if}
</main>