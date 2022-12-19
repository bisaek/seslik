<script lang="ts">
	import {
		collection,
		doc,
		getDoc,
		getDocs,
		orderBy,
		query
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase';
	import { whenLoggedIn } from '$lib/firebaseFun';
	import type { User } from 'firebase/auth';

	let items: any[] = [];
	async function getMyItems(user: User) {
		const bagQuery = query(collection(db, 'users', user.uid, 'bag'));
		try {
			const bagData = await getDocs(bagQuery);
			bagData.forEach(async (item) => {
				const itemRef = doc(db, 'items', item.id);
				const itemData = await getDoc(itemRef);
				items.push({ ...item.data(), ...itemData.data(), id: item.id });
				items = items;
			});
			console.log(items);
		} catch (error) {
			console.error(error);
		}
	}
	// getMyItems();

	whenLoggedIn(getMyItems);
</script>

<ul>
	sd
	{#each items as item}
		<li class="flex flex-row">
			<img src={item.url} class="w-28" alt="" />
			<div class="flex flex-col">
				<label for="">{item.name}</label>
				<input type="number" name="" value={item.s} id="" />
			</div>
		</li>
	{/each}
</ul>
