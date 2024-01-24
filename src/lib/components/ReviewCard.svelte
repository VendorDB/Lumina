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
	import StarsDisplay from './StarsDisplay.svelte';
	import Base64Image from './Base64Image.svelte';
	import { onMount } from 'svelte';
	import { getProfilePicture } from '$api/user';

	export let review: Review;

	let profilePicture: string;

	onMount(async () => {
		profilePicture = (await getProfilePicture(review.author._id)).picture;
	});

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}
</script>

<div class="review">
	{#if review}
		<div class="review-header">
			<div>
				<Base64Image
					imageData={profilePicture}
					alt="Profile Picture"
					style="width: 2rem; border-radius: 25px;"
				/>
			</div>
			{review.author.username}
			<StarsDisplay stars={review.stars} />
			<div>
				{formatDate(review.created)}
			</div>
		</div>
		<span class="divider" />
		<div class="review-content">
			<textarea readonly rows="10">{review.message}</textarea>
		</div>
	{/if}
</div>

<style>
	.review {
		border-radius: 25px;
		width: 100%;
		padding: 1rem;
		margin-bottom: 1rem;
		overflow-wrap: break-word;

		display: flex;
		flex-direction: row;
	}

	.review-content {
		overflow-wrap: break-word;
		width: 100%;
	}

	.divider {
		border-left: 2px solid grey;
		min-height: 100%;
		width: 2px;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	textarea {
		resize: none;
		width: 100%;
		padding: 0.5rem;
	}

	@media only screen and (max-width: 600px) {
		.review {
			width: 100vw;
		}
	}
</style>
