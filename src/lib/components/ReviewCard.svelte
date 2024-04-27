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
	import { getProfile } from '$api/user';
	import { user } from '$lib/stores';
	import { likeReview, reportReview } from '$api/review';
	import { getVendor } from '$api/vendor';
	import { abbreviateNumber } from '$util/math';
	import { deleteReview } from '$api/moderator/review';
	import Modal from './Modal.svelte';
	import ReviewCard from './ReviewCard.svelte';
	import VerifiedIndicator from './review-indicators/VerifiedIndicator.svelte';
	import StaffIndicator from './review-indicators/StaffIndicator.svelte';
	import NewUserIndicator from './review-indicators/NewUserIndicator.svelte';
	import ms from 'ms';

	const dispatch = createEventDispatcher();

	export let review: Review;
	export let displayOnly = false;
	export let displayVendor = false;
	export let style = '';
	export let embedded = false;

	let author: User;
	let vendor: Vendor;

	let deleteConfirmModal: Modal;
	let reportConfirmModal: Modal;

	onMount(async () => {
		author = await getProfile(review.author._id);
		if (displayVendor) {
			vendor = await getVendor(review.vendor);
		}
	});

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleDateString();
	}

	function formatTime(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleTimeString();
	}

	function like() {
		likeReview(review.vendor, review._id).then(() => {
			if (!$user) return;
			review.likeAmount += 1;
			review.likes.push($user._id);
		});
	}
</script>

<div class="review" {style}>
	{#if review && author}
		<div class="review-header">
			<a href={`/profile/${author._id}`} target={embedded ? '_blank' : ''}>
				<div>
					<Base64Image
						imageData={author.profile_picture}
						alt="Profile Picture"
						style="width: 2rem; border-radius: 25px;"
					/>
				</div>
				{author.username}
			</a>
			<StarsDisplay stars={review.stars} />
			<div>
				{formatDate(review.created)} <br />
				{formatTime(review.created)}
			</div>
			{#if !displayOnly}
				<div style="margin-top: 0.5rem;display:flex;">
					<div style="flex-grow: 1">
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
					</div>

					{#if $user}
						<span style="margin-left: 0.5rem;" />
						{#if $user.perms >= 1}
							<button
								class="button is-danger"
								on:click={() => {
									deleteConfirmModal.open();
								}}><i class="fa-solid fa-trash-can" /></button
							>
						{:else if $user._id != review.author._id}
							<button
								title="Report"
								class="button is-danger"
								on:click={() => {
									reportConfirmModal.open();
								}}><i class="fa-solid fa-flag" /></button
							>
						{/if}
					{/if}
				</div>
			{/if}
		</div>
		<span class="divider" />
		<div class="review-content">
			{#if displayVendor && vendor}
				<a
					href={`/vendors/${vendor._id}`}
					class="vendor-indicator-link"
					target={embedded ? '_blank' : ''}
				>
					<div class="vendor-indicator">
						<Base64Image imageData={vendor.logo} alt="Logo" style="width: 1rem;" />
						{vendor.name}
					</div>
				</a>
			{/if}
			<textarea readonly>{review.message}</textarea>

			<div class="review-indicators">
				{#if review.verified}
					<VerifiedIndicator />
				{/if}
				{#if author.perms > 0}
					<StaffIndicator />
				{/if}
				{#if author.created > Date.now() - ms('7d')}
					<NewUserIndicator />
				{/if}
			</div>
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
				reportReview(review.vendor, review._id);
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
	.vendor-indicator {
		border-radius: 25px;
		padding: 0.5rem;
		width: fit-content;
		margin: 0 auto;
	}

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
		display: flex;
		position: relative;
	}

	.review-header {
		min-width: 8rem;
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
		flex-grow: 1;
	}

	@media only screen and (max-width: 600px) {
		.review {
			width: 100vw;
		}
	}
</style>
