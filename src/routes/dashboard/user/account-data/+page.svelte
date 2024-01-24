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
	import { fetchMe, getUserReviews } from '$api/user';
	import { user } from '$lib/stores';

	let data: any;
	let reviews: any;

	async function loadAccount() {
		await loadReviews();
		data = await fetchMe();
	}

	async function loadReviews() {
		if (!$user) return;
		reviews = await getUserReviews($user._id);
	}

	function limitString(str: string) {
		const maxLength = 32;
		if (str.length <= maxLength) {
			return str;
		} else {
			return str.substring(0, maxLength) + '...';
		}
	}

	function downloadData() {
		const jsonData = JSON.stringify(data, null, 2);
		const blob = new Blob([jsonData], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		const currentDate = new Date();
		const dateString = currentDate.toISOString().replace(/:/g, '-').slice(0, -5);
		a.href = url;
		a.download = `vendordb_accountdata_${data.username}_${dateString}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function downloadReviews() {
		const jsonData = JSON.stringify(reviews, null, 2);
		const blob = new Blob([jsonData], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		const currentDate = new Date();
		const dateString = currentDate.toISOString().replace(/:/g, '-').slice(0, -5);
		a.href = url;
		a.download = `vendordb_reviews_${data.username}_${dateString}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Account Data</h1>
	<p>
		Here, you can request a copy of all your account data. Please note that some information may be
		redacted for your security.
	</p>

	<div>
		{#if data}
			<div style="margin-top: 1rem;">
				<button
					on:click={() => {
						downloadData();
					}}
					class="button is-primary"
					><i class="fa-solid fa-download" />&nbsp;Download raw data as JSON</button
				>
				<button
					on:click={() => {
						downloadReviews();
					}}
					class="button is-primary"
					><i class="fa-solid fa-download" />&nbsp;Download reviews as JSON</button
				>
			</div>

			<table class="table" style="margin-top: 1rem">
				<tbody>
					{#each Object.keys(data) as key}
						<tr>
							<th>{key}</th>
							<td>{limitString(data[key].toString())}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<button on:click={loadAccount} class="button is-primary" style="margin-top: 1rem;"
				>Load Account Data</button
			>
		{/if}
	</div>
</main>

<style>
	td {
		word-break: break-all;
	}
</style>
