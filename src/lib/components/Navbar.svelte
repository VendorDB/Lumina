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

	import {user} from '$lib/stores'
	import {logout as APILogout} from '$lib/api'
	import Base64Image from './Base64Image.svelte';

	let navbarMenu: HTMLDivElement;
	let navbarBurger: HTMLElement;

	function toggle() {
		navbarBurger.classList.toggle('is-active');
		navbarMenu.classList.toggle('is-active');
	}

	function logout() {
		APILogout()
		user.set(null)
	}

</script>

<nav class="navbar is-dark" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<img src="/assets/logo-112x28.png" width="112" height="28" alt="VendorDB" />
		</a>

		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			bind:this={navbarBurger}
			on:click={toggle}
			on:keypress={toggle}
			tabindex="0"
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div class="navbar-menu" bind:this={navbarMenu}>
		<div class="navbar-start">
			<a class="navbar-item" href="/vendors"> Vendors </a>

			<a class="navbar-item" href="/faq"> FAQ </a>

			<div class="navbar-item has-dropdown is-hoverable">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="navbar-link"> More </a>

				<div class="navbar-dropdown">
					<a class="navbar-item" href="https://matrix.to/#/#vendordb:research-community.org" target="_blank"> <i class="fas fa-comments"/> &nbsp; Matrix Chat </a>
					<a class="navbar-item" href="https://github.com/VendorDB" target="_blank"> <i class="fab fa-github"/> &nbsp; GitHub </a>
					<a class="navbar-item" href="https://opencollective.com/research-fund/projects/vendordb" target="_blank"> <i class="fas fa-piggy-bank"/> &nbsp; Open Collective </a>
				</div>
			</div>
		</div>

		<div class="navbar-end">

			{#if $user}
				
			<div class="navbar-item has-dropdown is-hoverable">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="navbar-link"> 
					<span class="profile-picture"><Base64Image imageData={$user.profile_picture} alt="Profile Picture" width="25" /></span>
					{$user.username} 
				</a>

				<div class="navbar-dropdown is-right">
					<a class="navbar-item" href="/dashboard/user"> <i class="fas fa-gear"/> &nbsp; User Dashboard </a>

					{#if $user.moderator || $user.admin}
						<hr class="navbar-divider">
						<a class="navbar-item" href="/dashboard/moderation"> <i class="fas fa-gavel"/> &nbsp; Moderator Dashboard </a>
					{/if}

					{#if $user.admin}
						<a class="navbar-item" href="/dashboard/admin"> <i class="fas fa-screwdriver-wrench"/> &nbsp; Admin Dashboard </a>
					{/if}

					<hr class="navbar-divider">

					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<a class="navbar-item" id="logout" on:click={logout} on:keypress={logout}> <i class="fas fa-arrow-right-from-bracket"></i> &nbsp; Logout </a>
				</div>
			</div>

			{:else}

				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-primary" href="/signup">
							<strong>Sign Up</strong>
						</a>
						<a class="button is-light" href="/login">
							Login
						</a>
					</div>
				</div>

			{/if}

		</div>

	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
	}

	#logout {
		background-color: rgba(190, 14, 14, 0.479);
	}

	.profile-picture {
		margin-right: 0.5rem;
	}

</style>