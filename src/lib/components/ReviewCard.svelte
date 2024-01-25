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
	import { createEventDispatcher, onMount } from 'svelte';
	import { getProfilePicture } from '$api/user';
	import { user } from '$lib/stores';
	import { likeReview, reportReview } from '$api/review';
	import { abbreviateNumber } from '$util/math';
	import { deleteReview } from '$api/moderator/review';
	import Modal from './Modal.svelte';
	import ReviewCard from './ReviewCard.svelte';

	const dispatch = createEventDispatcher();

	export let review: Review;
	export let displayOnly = false;

	let profilePicture: string;

	let deleteConfirmModal: Modal;
	let reportConfirmModal: Modal;

	onMount(async () => {
		profilePicture = (await getProfilePicture(review.author._id)).picture;
	});

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	function like() {
		likeReview(review.vendor, review._id).then(() => {
			if (!$user) return;
			review.likeAmount += 1;
			review.likes.push($user._id);
		});
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
			{#if !displayOnly}
				<div style="margin-top: 0.5rem;">
					{#if !$user || review.author._id == $user._id || review.likes.includes($user._id)}
						<button class="button is-danger"
							><i class="fa-solid fa-heart" />&nbsp;{review.likeAmount
								? abbreviateNumber(review.likeAmount, 2)
								: 0}</button
						>
					{:else}
						<button class="button is-danger is-outlined" on:click={like}
							><i class="fa-regular fa-heart" />&nbsp;{review.likeAmount
								? abbreviateNumber(review.likeAmount, 2)
								: 0}</button
						>
					{/if}

					{#if $user}
						{#if $user.perms >= 1}
							<button
								class="button is-danger"
								on:click={() => {
									deleteConfirmModal.open();
								}}><i class="fa-solid fa-trash-can" /></button
							>
						{:else if $user._id != review.author._id}
							<button title="Report" class="button is-danger" on:click={() => {
								reportConfirmModal.open()
							}}><i class="fa-solid fa-flag" /></button
							>
						{/if}
					{/if}
				</div>
			{/if}
		</div>
		<span class="divider" />
		<div class="review-content">
			<textarea readonly rows="10">{review.message}</textarea>
		</div>
	{/if}
</div>

{#if !displayOnly}
	<Modal
		bind:this={deleteConfirmModal}
		title="Confirm Deletion"
		buttons={['cancel', 'confirm']}
		on:buttonClick={(event) => {
			if (event.detail == 'confirm') {
				deleteReview(review._id);
				dispatch('delete', review._id);
			}
		}}
	>
		<h2 class="subtitle">Do you really want to delete this review?</h2>
		<div>
			<ReviewCard displayOnly {review} />
		</div>
	</Modal>

	<Modal
		bind:this={reportConfirmModal}
		title="Confirm Report"
		buttons={['cancel', 'confirm']}
		on:buttonClick={(event) => {
			if (event.detail == 'confirm') {
				reportReview(review.vendor, review._id)
			}
		}}
	>
		<h2 class="subtitle">Do you really want to report this review?</h2>
		<div>
			<ReviewCard displayOnly {review} />
		</div>
	</Modal>
{/if}

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
