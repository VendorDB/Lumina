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
	import { goto } from '$app/navigation';
	import { login } from '$lib/api';
	import { user as userStore } from '$lib/stores';

	let email = '';
	let password = '';

	function submit() {
		login(email, password)
			.then((data) => {
				userStore.set(data.user);
				goto('/');
			})
			.catch((err) => {
				alert(err.message);
			});
	}
</script>

<main class="container">
	<h1 class="title">Login</h1>
	<h2 class="subtitle">Don't have an account yet? <a href="/signup">Sign up</a>!</h2>

	<form on:submit={submit}>
		<div class="field">
			<label for="email" class="label">Email Address</label>
			<div class="control">
				<input
					id="email"
					class="input"
					type="email"
					placeholder="Your email address"
					bind:value={email}
				/>
			</div>
		</div>

		<div class="field">
			<label for="password" class="label">Password</label>
			<div class="control">
				<input
					id="password"
					class="input"
					type="password"
					placeholder="Your password"
					bind:value={password}
				/>
			</div>
		</div>

		<button class="button is-primary" type="submit"> Login </button>
	</form>
</main>
