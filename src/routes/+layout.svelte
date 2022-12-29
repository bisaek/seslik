<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase';
	import '../app.css';
	import bag from '$lib/bag.svg';
	let signedIn = false;

	async function signIn() {
		const googleProvider = new GoogleAuthProvider();

		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result.user.email);
		} catch (error) {
			console.error(error);
		}
	}
	async function logOut() {
		let response = await signOut(auth);
	}

	// let bagController = new SuperGif

	// async function addUserToFirestore(user) {}

	onMount(() => {
		//check if user is signed in
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = doc(db, 'users', user.uid);
				setDoc(userRef, { last: serverTimestamp() }, { merge: true });
				signedIn = true;
			} else {
				signedIn = false;
			}
		});
	});
</script>

<header
	class="bg-gray-800 text-white py-4 flex justify-between items-center px-8"
>
	<div>
		<a
			href="/"
			class="btn bg-gray-300 text-gray-800 rounded-full px-4 py-2 mr-4 hover:bg-gray-400"
			>Home</a
		>
	</div>
	<div class="flex items-center">
		{#if signedIn}
			<button
				on:click={logOut}
				class="btn bg-gray-300 text-gray-800 rounded-full px-4 py-2 mr-4 hover:bg-gray-400"
				>Sign out</button
			>
		{:else}
			<button
				on:click={signIn}
				class="btn bg-gray-300 text-gray-800 rounded-full px-4 py-2 mr-4 hover:bg-gray-400"
				>Sign in</button
			>
		{/if}

		<a
			href="/basket"
			class="btn bg-gray-300 text-gray-800 rounded-full px-4 py-2 hover:bg-gray-400"
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
				/></svg
			>
		</a>
	</div>
</header>

<slot />

<style>
	.shoppingBag {
		animation-play-state: paused;
		-moz-animation-play-state: paused;
		-o-animation-play-state: paused;
		/* -webkit-animation-play-state: paused; */
	}
</style>
