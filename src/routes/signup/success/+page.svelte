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
	import { page } from '$app/stores';
	import { resendVerification } from '$api/user';

	const email = $page.url.searchParams.get('email') || '';

	function resend() {
		resendVerification(email)
			.then(() => {
				alert('Email Sent');
			})
			.catch((err) => {
				alert(err.message);
			});
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Success!</h1>
	<h3>We've just sent you an e-mail! Please click the link inside it to activate your account!</h3>
	<button class="button is-primary" on:click={resend}>Resend Mail</button>
</main>

<style>
	button {
		margin-top: 1rem;
	}
</style>
