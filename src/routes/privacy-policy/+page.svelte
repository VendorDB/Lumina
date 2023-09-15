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
<main class="container has-text-centered">
	<h1 class="title is-size-3">Privacy Policy</h1>

	<!-- Section 1: Introduction -->
	<section class="section">
		<h2 class="title is-size-4">1. Introduction</h2>
		<p>
			Welcome to VendorDB! This privacy policy outlines how we collect, use, and protect your
			personal data when you use our platform. By accessing or using VendorDB, you agree to the
			terms of this policy.
		</p>
	</section>

	<!-- Section 2: Information We Collect -->
	<section class="section">
		<h2 class="title is-size-4">2. Information We Collect</h2>
		<p>VendorDB collects the following data:</p>
		<ul>
			<li>IP address from all users</li>
			<li>
				Username, email address, password (hashed via bcrypt), and date of birth (for age
				verification during registration) from registered users
			</li>
			<li>
				Profile picture, display name, "About Me" section, and country of residence (optional) as
				set by users
			</li>
		</ul>
		<p>
			We do not collect any other personal data, and all data is stored in a secure MongoDB
			database.
		</p>
	</section>

	<!-- Section 3: Use of Your Information -->
	<section class="section">
		<h2 class="title is-size-4">3. Use of Your Information</h2>
		<p>VendorDB uses your information for the following purposes:</p>
		<ul>
			<li>Providing and promoting VendorDB services</li>
			<li>Verifying your identity for age verification during registration</li>
			<li>Allowing user interaction, such as reviews and updates</li>
			<li>Personalizing your experience on VendorDB</li>
			<li>Contacting you with service-related announcements</li>
			<li>Handling support and user inquiries</li>
		</ul>
		<p>
			Your personal data is not shared with any third parties. All data processing is strictly for
			the operation and improvement of VendorDB services.
		</p>
	</section>

	<!-- Section 4: Legal Basis for Data Processing -->
	<section class="section">
		<h2 class="title is-size-4">4. Legal Basis for Data Processing</h2>
		<p>VendorDB processes your personal data based on the following legal grounds:</p>
		<ul>
			<li>
				For the performance of the contract with registered users (e.g., providing access to
				VendorDB services)
			</li>
			<li>
				For compliance with legal obligations, such as age verification and data protection
				regulations
			</li>
			<li>For the legitimate interests pursued by VendorDB to maintain and improve the platform</li>
		</ul>
		<p>You have the right to withdraw your consent at any time by deleting your account.</p>
	</section>

	<!-- Section 5: Cookies and Session Tokens -->
	<section class="section">
		<h2 class="title is-size-4">5. Cookies and Session Tokens</h2>
		<p>
			VendorDB uses session tokens in the form of JSON Web Tokens (JWT) for registered users to
			maintain their sessions. These tokens are securely stored on the client-side as HTTP-only
			cookies.
		</p>
		<p>
			There are no other cookies used on VendorDB, and no third-party tracking or analytics software
			is utilized. Your consent to cookies is implied when you log in, and no additional cookie
			consent button is required. Session tokens expire three days after being issued, and they are
			automatically renewed upon each login.
		</p>
	</section>

	<!-- Section 6: Data Security -->
	<section class="section">
		<h2 class="title is-size-4">6. Data Security</h2>
		<p>
			VendorDB takes data security seriously. All data is stored in a MongoDB database, with
			passwords hashed via bcrypt for added protection. The database is not directly accessible from
			the internet, and access is restricted to the server via firewall rules. All traffic on
			VendorDB is SSL-only, ensuring encrypted communication between the server and users. The
			server itself is accessible only via SSH, using a private/public key system with password
			login disabled.
		</p>
		<p>
			If a data breach occurs, VendorDB will take immediate action to limit its severity. Affected
			users will be notified via email and will have their passwords reset. If the full extent of
			the breach is uncertain, a precautionary password reset may be applied to all users. VendorDB
			will also release a public statement on all available channels, such as the website and social
			media, to inform users about the incident.
		</p>
	</section>

	<!-- Section 7: Data Retention -->
	<section class="section">
		<h2 class="title is-size-4">7. Data Retention</h2>
		<p>
			VendorDB retains your personal data for as long as your account is active. If you choose to
			delete your account, all associated account data, including any past reviews, will be
			immediately removed from our database. Users have the right to request deletion of their
			account at any time. Account data that is no longer necessary will be securely deleted.
		</p>
	</section>

	<!-- Section 8: Children's Privacy -->
	<section class="section">
		<h2 class="title is-size-4">8. Children's Privacy</h2>
		<p>
			VendorDB is not intended for use by individuals under the age of 18. We do not knowingly
			collect personal data from children. If you are a parent or guardian and believe that your
			child has provided personal data to VendorDB, please contact us at privacy@vendordb.info to
			request deletion of the data.
		</p>
	</section>

	<!-- Section 9: Your Data Subject Rights -->
	<section class="section">
		<h2 class="title is-size-4">9. Your Data Subject Rights</h2>
		<p>As a user of VendorDB, you have the following data subject rights:</p>
		<ul>
			<li>
				Right to access: You can view all data collected about you by logging in and clicking a
				button.
			</li>
			<li>Right to rectification: You can edit your data in user settings.</li>
			<li>
				Right to erasure: You can delete your account and all associated data at any time by logging
				in and clicking a button.
			</li>
			<li>
				Right to restriction of processing: If you do not consent to data processing, you can delete
				your account.
			</li>
			<li>
				Right to data portability: When requesting your data, it can optionally be displayed as JSON
				format.
			</li>
			<li>Right to object: You can delete your account if you object to data processing.</li>
			<li>
				Right not to be subject to automated decision making: Currently, no automated decision
				processes are in place. Any future implementations will involve human moderation.
			</li>
		</ul>
		<p>
			To exercise your rights or if you have any questions about our privacy practices, please
			contact us at privacy@vendordb.info.
		</p>
	</section>

	<!-- Section 10: Contact Information -->
	<section class="section">
		<h2 class="title is-size-4">10. Contact Information</h2>
		<p>
			If you have any questions or concerns regarding this privacy policy or your data on VendorDB,
			please contact us at:
		</p>
		<p>
			Xenorio - Management<br />
			Schlesierstraße 3<br />
			64546 Mörfelden-Walldorf<br />
			Germany<br />
			Email: privacy@vendordb.info<br />
			Representative: Marcus Huber
		</p>
	</section>

	<!-- Section 11: Changes to This Policy -->
	<section class="section">
		<h2 class="title is-size-4">11. Changes to This Policy</h2>
		<p>
			Users will be notified of any changes to this privacy policy via email using the address
			associated with their account. Additionally, a message will be sent in the news room of our
			Matrix space. All changes are also accessible on our GitHub repository. Continued use of
			VendorDB after policy updates implies acceptance of the revised terms.
		</p>
	</section>
</main>

<svelte:head>
	<title>VendorDB | Privacy Policy</title>
</svelte:head>
