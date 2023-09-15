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

	let activePage = 'profile'; // Default active page
	let isMobileMenuOpen = false; // Track mobile menu state

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;

	}

	function navigate(page: string) {
		activePage = page; // Set the active page
		goto('./' + page);
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
role="button"
class="navbar-burger mobile-menu-button"
class:is-active={isMobileMenuOpen}
aria-label="menu"
aria-expanded="false"
on:click={toggleMobileMenu}
on:keypress={toggleMobileMenu}
tabindex="0"
>
<span aria-hidden="true" />
<span aria-hidden="true" />
<span aria-hidden="true" />
</a>

<div class="dashboard-wrapper">

	<aside class="menu" class:is-mobile={isMobileMenuOpen}>
		<p class="menu-label">Settings</p>
		<ul class="menu-list">
			<li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					class={activePage === 'profile' ? 'is-active' : ''}
					role="button"
					tabindex="0"
					on:click={() => navigate('profile')}
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							navigate('profile');
						}
					}}
				>
					Profile
				</a>

				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					class={activePage === 'security' ? 'is-active' : ''}
					role="button"
					tabindex="0"
					on:click={() => navigate('security')}
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							navigate('security');
						}
					}}
				>
					Security
				</a>
			</li>
		</ul>
	</aside>

	<div class="dashboard-content">
		<slot />
	</div>
</div>

<svelte:head>
	<title>
		VendorDB | Dashboard
	</title>
</svelte:head>

<style>
	.dashboard-wrapper {
		display: flex;
		margin: 1rem;
	}

	.menu {
		width: 10rem;
	}

	.dashboard-content {
		margin-left: 1rem;
		flex-grow: 1;
	}

	.menu.is-mobile {
		/* Show the menu on mobile */
		display: block;
	}

	.mobile-menu-button {
		display: none; /* Hide on desktop */
		cursor: pointer;
		color: white;
		float: left;
	}

	/* Add more styles as needed */
	@media screen and (max-width: 768px) {
		.menu {
			display: none; /* Hide on desktop */
		}
		.mobile-menu-button {
			display: block; /* Show on mobile */
		}
	}
</style>
