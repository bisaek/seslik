<script lang="ts">
	import {
		deleteDoc,
		doc,
		FieldValue,
		increment,
		setDoc
	} from 'firebase/firestore';
	import { auth, db } from '../firebase';
	import type { Item } from '$lib/types';

	export let item: Item;
	let removed = false;

	function updateItem() {
		if (!auth.currentUser) {
			let bag = JSON.parse(localStorage.getItem('bag') || '{}');
			bag[item.id].quantity = item.quantity;
			localStorage.setItem('bag', JSON.stringify(bag));
			return;
		}
		const itemRef = doc(
			db,
			'users',
			auth.currentUser.uid,
			'bag',
			item.id || ''
		);
		setDoc(itemRef, { quantity: item.quantity }, { merge: true });
	}
	function increaseQuantity() {
		if (!item.quantity) item.quantity = 1;
		item.quantity++;
		updateItem();
	}
	function decreaseQuantity() {
		if (!item.quantity) item.quantity = 1;
		if (item.quantity <= 1) return;
		item.quantity--;
		updateItem();
	}
	async function remove() {
		if (!auth.currentUser) return;
		const itemRef = doc(
			db,
			'users',
			auth.currentUser.uid,
			'bag',
			item.id || ''
		);
		await deleteDoc(itemRef);
		removed = true;
	}
</script>

{#if !removed}
	<div
		class="basket-item rounded bg-gray-200 p-4 flex items-center justify-between"
	>
		<img src={item.url} alt="" class="h-20" />
		<div class="flex-1">
			<h3 class="text-xl font-bold mb-2">{item.name}</h3>
			<!-- <p class="text-gray-600 mb-2">Product description goes here</p> -->
			<p class="text-gray-700 mb-2">
				Quantity: {item.quantity}
				<span class="bg-slate-100 rounded-full">
					<button class="py-2 px-3" on:click={increaseQuantity}>+</button>
					<button class="py-2 px-3" on:click={decreaseQuantity}>-</button>
				</span>
			</p>
		</div>
		<div>
			<p class="text-gray-700 mb-2">
				{(item.price || 0) * (item.quantity || 1)} kr
			</p>
			<button
				on:click={remove}
				class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline"
				>Remove</button
			>
		</div>
	</div>
{/if}
