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
	import { deleteVendor as APIdeleteVendor } from '$api/admin/vendor';
	import { getVendors } from '$api/vendor';
	import VendorCard from '$lib/components/VendorCard.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import VendorFilterMenu from '$lib/components/VendorFilterMenu.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let vendors: Vendor[] = [];

	let page = 1;
	let limit = 25;
	let filter = {};

	let deleteConfirmModal: Modal;
	let actionVendor: Vendor;

	function loadVendors() {
		getVendors(filter, page, limit).then((data) => {
			if (data.vendors) {
				vendors = vendors.concat(data.vendors);
				page += 1;
			}
		});
	}

	function reloadVendors() {
		vendors = [];
		page = 1;
		loadVendors();
	}

	function handleVendorAction(event: any) {
		const data = event.detail;
		actionVendor = data.vendor;
		switch (data.type) {
			case 'delete':
				deleteConfirmModal.open();
				break;

			case 'edit':
				editVendor();
				break;

			default:
				break;
		}
	}

	function deleteVendor() {
		APIdeleteVendor(actionVendor._id).then(() => {
			reloadVendors();
		});
	}

	function editVendor() {
		goto(`/dashboard/admin/vendors/${actionVendor._id}/edit`);
	}

	onMount(() => {
		loadVendors();
	});
</script>

<main class="container has-text-centered">
	<h1 class="title">Vendors</h1>

	<div style="margin-bottom: 1rem;">
		<a href="/dashboard/admin/vendors/create"
			><button class="button is-primary"><i class="fa-solid fa-plus" />&nbsp;Create</button></a
		>
	</div>

	<VendorFilterMenu
		on:filtersApplied={(event) => {
			filter = event.detail;
			reloadVendors();
		}}
	/>

	{#if vendors}
		<div class="card-container" style="justify-content: left;">
			{#each vendors as vendor}
				<VendorCard {vendor} admin on:adminAction={handleVendorAction} />
			{/each}
		</div>
	{/if}
</main>

<Modal
	title="Confirm Deletion"
	buttons={['cancel', 'confirm']}
	bind:this={deleteConfirmModal}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') deleteVendor();
	}}
>
	{#if actionVendor}
		Do you really want to delete <strong>{actionVendor.name}</strong>?
	{/if}
</Modal>
