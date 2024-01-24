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

<script>
	import '../app.scss';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '@fontsource/port-lligat-slab';

	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { fetchMe } from '$api/user';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$user) {
			fetchMe().then((data) => {
				user.set(data);
			});
		}
	});
</script>

<Navbar />

<slot />

<Footer />
