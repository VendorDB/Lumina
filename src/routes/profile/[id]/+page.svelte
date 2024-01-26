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
	import Base64Image from '$lib/components/Base64Image.svelte';
	import { getProfile, getUserReviews } from '$api/user';
	import { onMount } from 'svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import { user } from '$lib/stores';

	export let data;

	let profile: User;
	let reviews: Review[];

	onMount(async () => {
		profile = await getProfile(data.id);
		reviews = await getUserReviews(data.id);
	});
</script>

<main class="container has-text-centered">
	{#if profile}
		<Base64Image imageData={profile.profile_picture} alt="Profile Picture" style="width: 10rem;" />
		<h1 class="title">{profile.username}</h1>
		{#if profile.about}
			<h2 class="subtitle">{profile.about}</h2>
		{/if}

		<div class="section">
			<h1 class="title">Reviews</h1>

			{#if reviews && reviews[0]}
				<div class="review-card-wrapper">
					{#each reviews as review}
						<ReviewCard
							{review}
							displayVendor
							on:delete={(event) => {
								const id = event.detail;
								reviews = reviews.filter((x) => x._id != id);
							}}
						/>
					{/each}
				</div>
			{:else}
				{profile.username} has not written a review yet
			{/if}
		</div>
	{/if}
</main>

<svelte:head>
	<title>
		{profile ? profile.username : 'Profile'} | VendorDB
	</title>
</svelte:head>
