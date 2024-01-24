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
	import { requestVendor } from '$api/vendor';
	import { goto } from '$app/navigation';

	let name: string;
	let url: string;

	function submit() {
		requestVendor({name, url})
			.then(() => {
				alert('Request Sent')
				goto('/vendors')
			})
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Vendor Request</h1>

	<form on:submit={submit}>
		<div class="field">
			<label for="name" class="label">Name</label>
			<div class="control">
				<input id="name" class="input" type="text" bind:value={name} />
			</div>
		</div>

		<div class="field">
			<label for="url" class="label">URL</label>
			<div class="control">
				<input id="url" class="input" type="text" bind:value={url} />
			</div>
		</div>

		<button class="button is-primary" type="submit">Submit</button>
	</form>
</main>
