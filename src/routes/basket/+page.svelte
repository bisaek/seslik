<script lang="ts">
	import {
		collection,
		doc,
		getDoc,
		getDocs,
		orderBy,
		query,
		setDoc
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase';
	import { whenLoggedIn, whenNotLoggedIn } from '$lib/firebaseFun';
	import type { User } from 'firebase/auth';
	import Bestil from '$lib/basket/bestil.svelte';
	import BagItem from '$lib/basket/BagItem.svelte';

	let items: any[] = [];
	let itemsS = {};
	let loaded = false;
	let currentUser: User;

	async function getMyItems(user: User) {
		items = [];
		currentUser = user;
		const bagQuery = query(collection(db, 'users', user.uid, 'bag'));
		try {
			const bagData = await getDocs(bagQuery);
			bagData.forEach(async (item) => {
				const itemRef = doc(db, 'items', item.id);
				const itemData = await getDoc(itemRef);
				console.log(item.id);
				items.push({ ...item.data(), ...itemData.data(), id: item.id });
				items = items;
			});
			// console.log(items);
		} catch (error) {
			console.error(error);
		}
		// items = items;
	}
	// getMyItems();
	let bag = {};

	async function getMyItemsFromLocalStorage() {
		// let bag = JSON.parse(window.localStorage.getItem('bag') || '{}');
		items = [];
		for (let [id, item] of Object.entries(bag)) {
			const itemRef = doc(db, 'items', id);
			const itemData = await getDoc(itemRef);
			items.push({ ...item, ...itemData.data(), id });
			items = items;
		}
		// bag.forEach(async (item) => {
		// 	const itemRef = doc(db, 'items', item.id);
		// 	const itemData = await getDoc(itemRef);
		// 	console.log(item.id);
		// 	items.push({ ...item.data(), ...itemData.data(), id: item.id });
		// 	items = items;
		// });
	}

	whenLoggedIn(getMyItems);
	whenNotLoggedIn(getMyItemsFromLocalStorage);
	onMount(() => (bag = JSON.parse(localStorage.getItem('bag') || '{}')));
</script>

<!-- {#if loaded} -->
<div class="bg-gray-800 flex flex-col gap-12 p-4">
	<div class="flex gap-4 flex-col">
		<h1 class="text-3xl font-bold text-center text-white mb-4">Kurv</h1>

		{#each items as item}
			<BagItem {item} />
		{/each}
	</div>

	<Bestil />
</div>
<!-- {/if} -->
