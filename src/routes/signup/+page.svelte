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
	import { AgeFromDate } from 'age-calculator';
	import { register } from '$lib/api';
	import { goto } from '$app/navigation';

	const mailRegex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let dateOfBirth = '';

	let usernameVerifyElement: HTMLDivElement;
	let emailVerifyElement: HTMLDivElement;
	let passwordVerifyElement: HTMLDivElement;
	let passwordConfirmVerifyElement: HTMLDivElement;
	let dobVerifyElement: HTMLDivElement;

	let validIndicatorElement: HTMLSpanElement;
	let submitButtonElement: HTMLButtonElement;

	let verificationValues: SignupValidator = {
		username: {
			charAmount: false,
			charTypes: false,
			noSpace: false
		},
		email: {
			valid: false
		},
		password: {
			charAmount: false,
			charTypes: false,
			noSpace: false,
			match: false
		},
		dateOfBirth: {
			valid: false
		}
	};

	function send() {
		verify();
		if (!areAllTrue(verificationValues)) return;

		register({
			username,
			email,
			password,
			dateOfBirth: new Date(dateOfBirth).getUTCMilliseconds()
		})
			.then(() => {
				goto('/signup/success?email=' + email);
			})
			.catch((err) => {
				// TODO: Actual error display
				alert(err.message);
			});
	}

	function verify() {
		console.log(dateOfBirth);

		verificationValues = {
			username: {
				charAmount: username.length > 0 && username.length <= 16,
				charTypes: /^[\x00-\x7F]*$/.test(username),
				noSpace: !username.includes(' ')
			},
			email: {
				valid: mailRegex.test(email.toLowerCase())
			},
			password: {
				charAmount: password.length >= 8,
				charTypes: /^[\x00-\x7F]*$/.test(password),
				noSpace: !password.includes(' '),
				match: password === passwordConfirm
			},
			dateOfBirth: {
				valid: new AgeFromDate(new Date(dateOfBirth)).age >= 18
			}
		};

		if (areAllTrue(verificationValues)) {
			submitButtonElement.classList.add('is-primary');
			submitButtonElement.classList.remove('is-danger');
			validIndicatorElement.classList.add('invisible');
		} else {
			{
				submitButtonElement.classList.remove('is-primary');
				submitButtonElement.classList.add('is-danger');
				validIndicatorElement.classList.remove('invisible');
			}
		}
	}

	function areAllTrue(obj: SignupValidator): boolean {
		for (const key in obj) {
			if (typeof obj[key] === 'object') {
				const subObj = obj[key];
				for (const subKey in subObj) {
					if (!subObj[subKey]) {
						return false;
					}
				}
			} else {
				if (!obj[key]) {
					return false;
				}
			}
		}
		return true;
	}
</script>

<main class="container has-text-centered">
	<h1 class="title">Sign Up</h1>
	<h2 class="subtitle">Already have an account? <a href="/login">Log in</a>!</h2>

	<form on:submit={send}>
		<div class="field">
			<label for="username" class="label">Username</label>
			<div class="control">
				<input
					id="username"
					class="input"
					type="text"
					placeholder="Choose your name..."
					bind:value={username}
					on:keyup={verify}
					on:focusin={() => {
						usernameVerifyElement.classList.remove('invisible');
					}}
					on:focusout={() => {
						usernameVerifyElement.classList.add('invisible');
					}}
				/>
			</div>

			<div id="username-requirements" class="invisible" bind:this={usernameVerifyElement}>
				<ul>
					<li>
						{#if verificationValues.username.charTypes && verificationValues.username.noSpace}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						Only ASCII characters, no spaces
					</li>
					<li>
						{#if verificationValues.username.charAmount}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						1-16 characters
					</li>
				</ul>
			</div>
		</div>

		<div class="field">
			<label for="email" class="label">Email Address</label>
			<div class="control">
				<input
					id="email"
					class="input"
					type="email"
					placeholder="Where do you want to be contacted?"
					bind:value={email}
					on:keyup={verify}
					on:focusin={() => {
						emailVerifyElement.classList.remove('invisible');
					}}
					on:focusout={() => {
						emailVerifyElement.classList.add('invisible');
					}}
				/>
			</div>

			<div id="email-requirements" class="invisible" bind:this={emailVerifyElement}>
				<ul>
					<li>
						{#if verificationValues.email.valid}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						Valid Email Address
					</li>
				</ul>
			</div>
		</div>

		<div class="field">
			<label for="dob" class="label">Date of Birth</label>
			<div class="control">
				<input
					id="dob"
					class="input"
					type="date"
					placeholder="When's your birthday?"
					bind:value={dateOfBirth}
					on:change={verify}
					on:focusin={() => {
						dobVerifyElement.classList.remove('invisible');
					}}
					on:focusout={() => {
						dobVerifyElement.classList.add('invisible');
					}}
				/>
			</div>

			<div id="password-requirements" class="invisible" bind:this={dobVerifyElement}>
				<ul>
					<li>
						{#if verificationValues.dateOfBirth.valid}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						At least 18 years old
					</li>
				</ul>
			</div>
		</div>

		<div class="field">
			<label for="password" class="label">Password</label>
			<div class="control">
				<input
					id="password"
					class="input"
					type="password"
					placeholder="Choose a secure password!"
					bind:value={password}
					on:keyup={verify}
					on:focusin={() => {
						passwordVerifyElement.classList.remove('invisible');
					}}
					on:focusout={() => {
						passwordVerifyElement.classList.add('invisible');
					}}
				/>
			</div>

			<div id="password-requirements" class="invisible" bind:this={passwordVerifyElement}>
				<ul>
					<li>
						{#if verificationValues.password.charTypes && verificationValues.password.noSpace}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						Only ASCII characters, no spaces
					</li>
					<li>
						{#if verificationValues.password.charAmount}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						At least 8 characters
					</li>
				</ul>
			</div>
		</div>

		<div class="field">
			<label for="passwordConfirm" class="label">Confirm Password</label>
			<div class="control">
				<input
					id="password-confirm"
					class="input"
					type="password"
					placeholder="Rinse and Repeat"
					bind:value={passwordConfirm}
					on:keyup={verify}
					on:focusin={() => {
						passwordConfirmVerifyElement.classList.remove('invisible');
					}}
					on:focusout={() => {
						passwordConfirmVerifyElement.classList.add('invisible');
					}}
				/>
			</div>

			<div
				id="password-confirm-requirements"
				class="invisible"
				bind:this={passwordConfirmVerifyElement}
			>
				<ul>
					<li>
						{#if verificationValues.password.match}
							<i class="fas fa-check" style="color: green;" />
						{:else}
							<i class="fas fa-x" style="color: red;" />
						{/if}
						Passwords Match
					</li>
				</ul>
			</div>
		</div>

		<span class="captcha" />

		<button type="submit" class="button is-danger" bind:this={submitButtonElement}>Submit</button>
		<span style="color: red" bind:this={validIndicatorElement}>Some information is invalid</span>
	</form>
</main>

<svelte:head>
	<title>VendorDB | Sign Up</title>
</svelte:head>

<style>
	.is-danger {
		cursor: not-allowed;
	}
</style>
