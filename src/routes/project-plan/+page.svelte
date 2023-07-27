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

<main class="container">
	<h1 class="title">VendorDB Project Plan</h1>
	<p>Providing Resources on Research Chemical Vendors</p>

	<hr />

	<h3 class="subtitle">The Plan</h3>
	<p>
		VendorDB is an objective, independent, community-centered source for quality information on RC
		vendors.
	</p>
	<p>
		The main use case is hosting user-generated reviews on vendors. However, it also offers other
		related features, such as:
	</p>
	<br />
	<ul>
		<li>- Listing general vendor information (Products, Prices, Shipping destinations, etc)</li>
		<li>- Searching for vendors based on filters including said information</li>
		<li>- Following vendors to stay informed on changes</li>
		<li>- Vendor Warnings (Scams, Laced substances, etc)</li>
	</ul>
	<br />
	<p>
		Every aspect of the site is fully Free&OpenSource, and licensed under the AGPLv3. Image assets
		are licensed under CC-BY-SA.
	</p>

	<hr />

	<h3 class="subtitle">Vendor Pages</h3>
	<p>Every listed vendor has its own page, where all information about them is collected.</p>

	<p>This includes:</p>
	<br />
	<ul>
		<li>- Name, logo (not sure about © implications yet), and link to store</li>
		<li>- Description</li>
		<li>
			- List of offered products, their prices, and shipping destinations, linked to their
			respective PsychonautWiki page where applicable
		</li>
		<li>- Review section</li>
		<li>- Updates section (explained below)</li>
	</ul>
	<br />

	<h4>Shipping Lists</h4>

	<p>
		The lists of shipping destinations use a black/whitelist system. There is a "general" list, and
		optionally one for every product.
	</p>

	<p>
		For example, if a vendor ships worldwide, but not to the USA or Finland, and 1D-LSD only to
		Germany:
	</p>

	<br />

	<table class="table">
		<thead>
			<tr>
				<th>Type</th>
				<th>Whitelist</th>
				<th>Blacklist</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>General</td>
				<td>Global</td>
				<td>USA, Finland</td>
			</tr>
			<tr>
				<td>1D-LSD</td>
				<td>Germany</td>
				<td>Global</td>
			</tr>
		</tbody>
	</table>

	<h4>Page Ownership</h4>

	<p>
		A vendor page may be in one of two different states, "owned" and "unowned". By default, pages
		are always unowned, indicating that all information originated from VendorDB itself. However,
		vendors themselves may take ownership of their page, turning it into an owned page.
	</p>

	<br />

	<p>Vendors who own their page have access to the following:</p>
	<ul>
		<li>- Changing product/price information</li>
		<li>- Changing shipping information</li>
		<li>- Changing description</li>
		<li>- Posting updates</li>
		<li>- Using purchase verification (explained in "reviews" section)</li>
	</ul>

	<br />

	<p>
		Vendors will <strong>NEVER</strong> be able to influence reviews in any way. However, they (and regular
		users) may report reviews for manual review.
	</p>

	<br />

	<p>
		Ownership is granted via e-mail verification. During the verification process, the vendor puts
		in an e-mail address that has to correspond to the same domain listed on the page. Then, a
		verification e-mail is sent, including a button to finalize verification.
	</p>

	<br />

	<p>Ownership verification may also be done manually by site admins.</p>

	<br />

	<h4>Updates Section</h4>

	<p>
		Owned pages have an updates section, unowned pages do not. In the updates section, vendors may
		post free-form text addressing their customers. This is meant as an alternative to e-mail
		newsletters which many vendors use.
	</p>

	<br />

	<h4>Reviews</h4>

	<p>
		Any registered user may post a review for any vendor. A review must always contain a star rating
		out of 5, and a description. It may optionally contain image attachments.
	</p>

	<br />

	<p>
		Vendors with page ownership may also use purchase verification. Via an API, they can request a
		one-time-use code to give to customers. This code can be entered during the review process,
		marking the review with "verified purchase". Once the review is posted, a webhook request is
		sent back to the vendor, informing them that the code has been used. This webhook does not
		contain any information about the review itself. Once a code has been used, it cannot be used
		again.
	</p>

	<br />

	<h4>Warnings</h4>

	<p>Site admins may post vendor warnings, for example due to exit-scams or laced substances.</p>

	<br />

	<p>
		There are two "warning levels", indicated as yellow and red. A yellow warning means that there
		is reason to suspect misconduct, a red warning indicates that misconduct has been proven.
	</p>

	<br />

	<p>
		Warnings are prominently displayed on the respective vendor's page using a colored banner. They
		are also displayed in search results, and in a separate warning feed.
	</p>

	<br />

	<p>Updates may be posted about warnings, similar to outage reports on website status pages.</p>

	<br />

	<p>A warning may look like this:</p>

	<br />

	<strong>ThatFakeRC.org - Impure Substances</strong>
	<table class="table">
		<thead>
			<tr>
				<th>Date</th>
				<th>Note</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>20.04.2023 14:53</td>
				<td>User reports show that ThatFakeRC may be selling 1D-LSD blotter containing NBOMe</td>
			</tr>
			<tr>
				<td>20.04.2023 15:10</td>
				<td>VendorDB has reached out to ThatFakeRC representatives for clarification</td>
			</tr>
			<tr>
				<td>21.04.2023 08:17</td>
				<td
					>ThatFakeRC has confirmed to have received a bad batch of blotter from wholesale. If you
					have received any 1D-LSD from them in the last 2 weeks, we urge you to destroy it.
					ThatFakeRC is looking into issuing refunds.</td
				>
			</tr>
		</tbody>
	</table>

	<h4>Notifications</h4>

	<p>
		Users may follow any vendor, which means they get sent e-mail notifications whenever the vendor
		page is updated or a warning is issued.
	</p>

	<p>Every vendor page also has an RSS feed containing the same information.</p>

	<hr />

	<h3 class="subtitle">Discover Section</h3>
	<p>
		The site has a "discover" section, allowing users to search through the database of vendors.
	</p>

    <br>

	<p>By default, the section shows all vendors, sortable by:</p>
	<ul>
		<li>- Name (Alphabetically)</li>
		<li>- Average rating</li>
		<li>- Date added</li>
		<li>- Date of last update</li>
	</ul>

    <br>

	<p>Users may apply filters, such as:</p>
	<ul>
		<li>- Name</li>
		<li>- Shipping destinations</li>
		<li>- Average rating</li>
		<li>- Offered products</li>
	</ul>

    <br>

	<p>
		If both the "offered products" and "shipping destinations" filters are applied, only vendors
		shipping the specified product to the specified destination are shown. If only the "shipping
		destinations" filter is applied, the general destination list is used.
	</p>

    <br>

	<p>
		So, for example, a user may search for "shipping 1D-LSD to Germany, sorted by descending average
		rating".
	</p>

	<hr />

	<h3 class="subtitle">User Accounts</h3>
	<p>
		Any user, registered or not, always has access to any and all information. However, only
		registered users are able to post reviews or take ownership of a vendor page.
	</p>

    <br>

	<p>Account registration always contains the following information:</p>
	<ul>
		<li>- Username</li>
		<li>- E-Mail address</li>
		<li>- Date of birth (do not allow users below the age of 18)</li>
		<li>- Password</li>
	</ul>

    <br>

	<p>Users may optionally set the following:</p>
	<ul>
		<li>- Profile picture</li>
		<li>- Display name</li>
		<li>- Bio</li>
		<li>- Country</li>
	</ul>

    <br>

	<p>All passwords are properly hashed using the BCrypt algorithm.</p>

    <br>

	<p>
		Users always have the option of deleting their entire account, including any and all
		information, even posted reviews. This happens instantly after initiation, there is no "grace
		period".
	</p>

	<hr />

	<h3 class="subtitle">Monetization</h3>
	<p>Site operation is done fully donation-based. There are no fees or locked content.</p>
	<br />
	<p>All financial transactions are always 100% transparent, via Open Collective.</p>
</main>

<svelte:head>
	<title>VendorDB | Project Plan</title>
</svelte:head>

<style>
	h4 {
		font-weight: bolder;
	}
</style>
