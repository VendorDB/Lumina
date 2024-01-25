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
	import { getVendor, reportVendor } from '$api/vendor';
	import { getReviews, postReview as APIpostReview } from '$api/review';
	import { onMount } from 'svelte';
	import StarsDisplay from '$lib/components/StarsDisplay.svelte';
	import StarsSelector from '$lib/components/StarsSelector.svelte';
	import Base64Image from '$lib/components/Base64Image.svelte';
	import ReviewCard from '$lib/components/ReviewCard.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { user } from '$lib/stores';

	export let data;

	let reviewInput = '';
	let selectedStars = 0;
	let starsSelector: StarsSelector;

	let goToTop: HTMLButtonElement;

	let vendor: Vendor;
	let reviews: Review[] = [];
	let reviewAverage = '0';

	let sortType: 'stars' | 'created' = 'created';
	let sortOrder = 'desc';

	let reviewsPage = 0;

	let reviewPostedModal: Modal;
	let reviewHeldModal: Modal;
	let reportModal: Modal;
	let reportSentModal: Modal;

	let reportReason: string;
	let reportMessage: string;

	onMount(async () => {
		window.addEventListener('scroll', function () {
			if (window.scrollY == 0) {
				goToTop.style.display = 'none';
			} else {
				goToTop.style.display = 'block';
			}

			if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
				loadReviews();
			}
		});

		vendor = await getVendor(data.id);
		loadReviews();
	});

	async function loadReviews() {
		console.log(reviewsPage);

		reviewAverage = (vendor.stars / vendor.reviewAmount).toFixed(1);
		if (reviewAverage == 'NaN') reviewAverage = '0';

		const newReviews = await getReviews(data.id, reviewsPage + 1, 25, sortOrder, sortType);

		if (newReviews) {
			reviewsPage += 1;
			reviews = reviews.concat(newReviews);
		}
	}

	function switchSortOrder() {
		if (sortOrder == 'asc') {
			sortOrder = 'desc';
		} else {
			sortOrder = 'asc';
		}
		reloadReviews();
	}

	async function reloadReviews() {
		reviewsPage = 1;
		reviews = [];
		reviews = await getReviews(data.id, 1, 10, sortOrder, sortType);
	}

	async function reload() {
		vendor = await getVendor(data.id);
		reviewsPage = 0;
		reviews = [];
		loadReviews();
		// reviews = await getReviews(data.id, 1, 10, sortOrder);
	}

	function postReview() {
		APIpostReview(vendor._id, reviewInput, selectedStars)
			.then((res) => {
				if (res.isHeld) {
					reviewHeldModal.open();
				} else {
					reviewPostedModal.open();
				}
				reviewInput = '';
				selectedStars = 0;
				starsSelector.reset();
				reload();
			})
			.catch((res) => {
				alert(res.message);
			});
	}

	async function sendReport() {
		await reportVendor(vendor._id, reportReason, reportMessage);
		reportSentModal.open();
	}
</script>

<main class="container has-text-centered vendor-page">
	{#if vendor}
		<div id="vendor-disclaimer">
			<strong>Disclaimer</strong> <br />
			VendorDB is in no way affiliated with {vendor.name}
		</div>

		<div id="header" class="section">
			<Base64Image imageData={vendor.logo} alt="Logo" style="width: 10rem" />
			<h1 class="title">{vendor.name}</h1>
			<h2 class="subtitle" style="margin-bottom: 0;">{vendor.description}</h2>

			{#if vendor.country}
				<div style="margin-top: 1rem; margin-bottom: 1rem;" class="country-indicator"
					>{vendor.country.label}</div>
			{:else}
				<div style="margin-bottom: 1rem;" />
			{/if}

			<a href={vendor.url} target="_blank" rel="noreferrer"
				><button class="button is-primary"
					>Visit&nbsp;<i class="fa-solid fa-up-right-from-square" /></button
				></a
			>
			<div style="margin-top: 1rem;">
				<button class="button is-danger" on:click={() => reportModal.open()}
					>Report&nbsp;<i class="fa-solid fa-flag" /></button
				>
			</div>
		</div>

		<div id="reviews" class="section">
			<h1 class="title">Reviews</h1>

			{#if $user}
				<div class="review-input" style="margin-bottom: 1rem;">
					<textarea
						bind:value={reviewInput}
						class="textarea is-primary"
						placeholder="Your Review"
						maxlength="2500"
					/>
					<StarsSelector bind:this={starsSelector} bind:selectedStars />
					<button
						on:click={postReview}
						class="button is-primary"
						disabled={!(selectedStars > 0 && reviewInput.trim() != '')}
						style="margin-top: 1rem;">Send Review&nbsp;<i class="fa-solid fa-paper-plane" /></button
					>
				</div>
			{/if}

			<strong>Average ({reviewAverage || 0})</strong>

			<StarsDisplay stars={vendor.stars / vendor.reviewAmount} />

			<div style="margin-top: 1rem;">
				<strong>Sorting</strong> <br />
				<div class="select is-primary">
					<select bind:value={sortType} on:change={reloadReviews}>
						<option value="created">Date</option>
						<option value="stars">Stars</option>
						<option value="likeAmount">Likes</option>
					</select>
				</div>

				<div class="select is-primary">
					<select bind:value={sortOrder} on:change={reloadReviews}>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>

				<!-- <button class="button is-primary" on:click={switchSortOrder}>
					Direction:
					{#if sortOrder == 'asc'}
						Ascending
					{:else}
						Descending
					{/if}
				</button> -->
			</div>

			<div class="review-card-wrapper">
				{#each reviews as review}
					<ReviewCard
						{review}
						on:delete={(event) => {
							const id = event.detail;
							reviews = reviews.filter((x) => x._id != id);
						}}
					/>
				{/each}
			</div>

			<!-- <button class="button is-dark" on:click={loadReviews}>Load More</button> -->
		</div>

		<button
			id="up-button"
			bind:this={goToTop}
			on:click={() => {
				window.scrollTo(0, 0);
			}}
			class="button is-dark"><i class="fa-solid fa-arrow-up" /></button
		>
	{/if}
</main>

<Modal title="Review Posted" bind:this={reviewPostedModal} buttons={['ok']}>
	Congratulations! Your review has been posted!
</Modal>

<Modal title="Review Held" bind:this={reviewHeldModal} buttons={['ok']}>
	Your review is being held. It will be made public after it has been checked by a moderator!

	<div>
		<a href="/faq#review-held">What does this mean?</a>
	</div>
</Modal>

<Modal
	title="Report Vendor"
	bind:this={reportModal}
	buttons={['cancel', 'confirm']}
	on:buttonClick={(event) => {
		if (event.detail == 'confirm') {
			sendReport();
		}
	}}
>
	<div class="field">
		<label for="report-reason">Reason</label>
		<div class="control">
			<div id="report-reason" class="select">
				<select bind:value={reportReason}>
					<option value="wrong-info">Incorrect Information</option>
					<option value="fraud">Scams & Fraud</option>
					<option value="closed">Vendor Closed</option>
				</select>
			</div>
		</div>
	</div>

	<div class="field">
		<label for="report-message">Message</label>
		<div class="control">
			<textarea bind:value={reportMessage} id="report-message" cols="50" rows="10" />
		</div>
	</div>
</Modal>

<Modal title="Report Sent" buttons={['ok']} bind:this={reportSentModal}>
	Thanks for sending your report!
</Modal>

<svelte:head>
	<title>
		{(vendor ? vendor.name + ' | ' : '') + 'VendorDB'}
	</title>
</svelte:head>

<style>
	#vendor-disclaimer {
		border-radius: 25px;
		padding: 1rem;
	}

	#up-button {
		display: none;
		position: fixed;
		right: 2rem;
		bottom: 2rem;
	}

	textarea {
		resize: none;
		margin-bottom: 1rem;
	}

	.country-indicator {
		width: fit-content;
		padding: 0.5rem;
		border-radius: 25px;
		display: block;
		margin: 0 auto;
	}
</style>
