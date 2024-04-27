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
	import VerifiedIndicator from "$lib/components/review-indicators/VerifiedIndicator.svelte";
	import StaffIndicator from "$src/lib/components/review-indicators/StaffIndicator.svelte";
	import NewUserIndicator from "$src/lib/components/review-indicators/NewUserIndicator.svelte";
</script>

<main class="container has-text-centered">
	<h1 class="title">Frequently Asked Questions</h1>

	<div class="faq-question" id="about">
		<h2 class="subtitle">What is VendorDB?</h2>
		VendorDB is a platform for independent information on vendors of Research Chemicals, which is still
		under heavy development.
	</div>

	<div class="faq-question" id="free">
		<h2 class="subtitle">Is VendorDB free?</h2>
		Yes! Both
		<a href="https://audio-video.gnu.org/video/TEDxGE2014_Stallman05_LQ.webm" target="_blank"
			>free as in freedom</a
		>, and free as in beer! VendorDB is purely based on donations. There are no fees, paywalls,
		locked content, premium memberships, and also no ads! <br />
		The source code is available on <a href="https://github.com/VendorDB" target="_blank">GitHub</a>
	</div>

	<div class="faq-question" id="updates">
		<h2 class="subtitle">How can I stay updated on the progress of VendorDB's development?</h2>
		By joining the
		<a href="https://matrix.to/#/#vendordb:research-community.org" target="_blank">Matrix Space</a>
		or checking out our <a href="https://github.com/VendorDB" target="_blank">GitHub Page</a>
	</div>

	<div class="faq-question" id="multiple-languages">
		<h2 class="subtitle">Will VendorDB support multiple languages?</h2>
		Currently, this is not planned. However, we may look into it in the future. If you're a translator,
		feel free to reach out!
	</div>

	<div class="faq-question" id="review-held">
		<h2 class="subtitle">Why is my review being held?</h2>
		VendorDB uses a reputation system to combat spam, instead of privacy-risking and annoying captcha
		services. When you post your first review, a moderator will need to manually check whether it's spam
		before it goes online. After the first one, you've got a chance for your review to go online without
		prior approval. Every time a moderator approves one of your reviews, this chance is increased (up
		to 75%), and every denied or deleted one decreases it.<br /><br />
		Staff reserves the right to manually modify your reputation at any point, in any direction. You may
		also be reputation-locked, which prevents you from gaining reputation. <br /><br />
		Formula for the nerds (JavaScript): <br />
		isHeld = user.reputation > 0 ? Math.random() &gt;= Math.min(user.reputation / 100, 0.75) : true
	</div>

	<div class="faq-question" id="review-edit">
		<h2 class="subtitle">Can reviews be edited?</h2>
		No. Neither by us, you, or any vendors. Every review is completely set in stone once it is submitted.
		However, reviews may be deleted&nbsp;<strong>only by VendorDB staff</strong> if they are determinded
		to be spam or otherwise malicious. Reviews are never deleted to impact ratings, for any reason, including
		money.
	</div>

	<div class="faq-question" id="review-delete">
		<h2 class="subtitle">Can I delete my reviews?</h2>
		Yes, but also no. Currently, the only way for you to delete reviews is to delete your entire account
		(which deletes all your reviews as well). However, we're still not sure if we will be keeping it
		this way.
	</div>

	<div class="faq-question" id="review-indicators">
		<h2 class="subtitle">What do the symbols next to reviews mean?</h2>
		<table class="table is-bordered">
			<tbody>
				<tr>
					<td>
						<VerifiedIndicator />
					</td>
					<td>
						This review is connected to a verified purchase
					</td>
				</tr>
				<tr>
					<td>
						<StaffIndicator />
					</td>
					<td>
						This review was written by VendorDB staff
					</td>
				</tr>
				<tr>
					<td>
						<NewUserIndicator />
					</td>
					<td>
						The author of this review registered their account less than 7 days ago
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</main>

<svelte:head>
	<title>VendorDB | FAQ</title>
</svelte:head>

<style>
	h2 {
		font-weight: bolder;
		margin-bottom: 1rem;
	}

	.faq-question {
		padding: 1rem;
		border-radius: 25px;
	}

	.faq-question,
	.title {
		margin-bottom: 2rem;
	}
</style>
