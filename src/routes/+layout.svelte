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

<header>
	{#if signedIn}
		<button on:click={logOut}>sign out</button>
	{:else}
		<button on:click={signIn}>sign in</button>
	{/if}
	<img src={bag} class="shoppingBag w-10 " autoplay={false} alt="" />
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
