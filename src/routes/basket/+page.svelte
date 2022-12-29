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
	import { whenLoggedIn } from '$lib/firebaseFun';
	import type { User } from 'firebase/auth';
	import Bestil from '$lib/basket/bestil.svelte';
	import BagItem from '$lib/basket/BagItem.svelte';

	let items: any[] = [];
	let itemsS = {};
	let loaded = false;
	let currentUser: User;

	async function getMyItems(user: User) {
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

	whenLoggedIn(getMyItems);
</script>

<!-- {#if loaded} -->
<div class="bg-gray-800 flex flex-col gap-12 p-4">
	<div class="flex gap-4 flex-col">
		<h1 class="text-3xl font-bold text-center text-white mb-4">Kurv</h1>

		{#each items as item}
			<BagItem {item} />
			<!-- <li class="flex flex-row">
			<img src={item.url} class="w-28" alt="" />
			<div class="flex flex-col">
				<label for="">{item.name}</label>
				<input
					type="number"
					name=""
					bind:value={item.s}
					on:input={() => updateItem(item)}
					id=""
				/>
				<label for="">{item.price * item.s} kr</label>
			</div>
		</li> -->
		{/each}
	</div>

	<Bestil />
</div>
<!-- {/if} -->
