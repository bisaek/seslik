<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import {
		collection,
		addDoc,
		query,
		orderBy,
		getDocs,
		updateDoc,
		doc,
		arrayUnion,
		getDoc,
		setDoc,
		increment
	} from 'firebase/firestore';
	/**
	 * @type {import("@firebase/firestore").DocumentData[]}
	 */
	let items: any[] = [];

	async function getItems() {
		try {
			const itemsQuery = query(
				collection(db, 'items'),
				orderBy('stocks', 'desc')
			);
			const itemsQuerySnapshot = await getDocs(itemsQuery);
			itemsQuerySnapshot.forEach((doc) => {
				items.push({ ...doc.data(), id: doc.id });
			});
			items = items;
			console.log(items);
		} catch (error) {
			console.error(error);
		}
	}
	getItems();

	async function addToBag(ItemId: string) {
		if (!auth.currentUser) return;
		console.log(ItemId);
		try {
			const userRef = doc(db, 'users', auth.currentUser?.uid, 'bag', ItemId);
			await setDoc(userRef, { s: increment(1) }, { merge: true });
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex flex-row gap-8 items-stretch justify-around flex-wrap ">
	{#each items as item}
		<div
			class="item flex justify-center flex-col flex-wrap bg-slate-800 w-80 text-slate-100 rounded-3xl p-6 "
		>
			<img src={item.url} alt="" />
			<p>{item.name}</p>
			<label for="price">price: {item.price}</label>
			<label for="stocks">stocks: {item.stocks}</label>
			<button on:click={() => addToBag(item.id)} class="self-end">
				add to backet
			</button>
		</div>
	{/each}
</div>
