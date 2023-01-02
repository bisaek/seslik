<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { isAdmin, whenLoggedIn } from '$lib/firebaseFun';
	import type { Item } from '$lib/types';
	import type { User } from 'firebase/auth';
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
	import AdminSettings from '$lib/itemAdmin.svelte';
	import { json } from '@sveltejs/kit';

	let items: Item[] = [];
	let user: User;
	let admin = false;

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

	whenLoggedIn(async (_user: User) => {
		user = _user;
		admin = await isAdmin(_user.uid);
		console.log(admin);
	});

	async function addToBag(ItemId: string) {
		if (!auth.currentUser) {
			let localBag = JSON.parse(localStorage.getItem('bag') || '{}');
			if (localBag[ItemId]) localBag[ItemId].quantity++;
			else localBag[ItemId] = { quantity: 1 };
			localStorage.setItem('bag', JSON.stringify(localBag));
			return;
		}
		console.log(ItemId);
		try {
			const userRef = doc(db, 'users', auth.currentUser?.uid, 'bag', ItemId);
			await setDoc(userRef, { quantity: increment(1) }, { merge: true });
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex flex-row gap-8 items-stretch justify-around flex-wrap ">
	{#each items as item}
		{#if item.stocks || 0 > 0 || admin}
			<div class="product bg-white shadow-md rounded-md p-4 flex items-center">
				<img
					src={item.url}
					alt="Product image"
					class=" h-32 rounded-full mr-4"
				/>
				<div class="flex-1">
					<h3 class="text-2xl font-bold leading-tight mb-2">{item.name}</h3>
					<p class="text-gray-600 text-sm mb-4">Product description</p>
					<div class="flex items-center">
						<p class="text-xl font-bold mr-2">{item.price} kr</p>
						<button
							class="btn bg-blue-500 text-white rounded-full px-4 py-2"
							on:click={() => addToBag(item.id || '')}>Add to basket</button
						>
						{#if admin}
							<AdminSettings {item} />
						{/if}
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
