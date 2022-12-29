<script lang="ts">
	import { db } from '$lib/firebase';
	import { whenLoggedIn, isAdmin } from '$lib/firebaseFun';
	import type { User } from 'firebase/auth';
	import {
		collection,
		deleteDoc,
		doc,
		getDoc,
		getDocs,
		query
	} from 'firebase/firestore';
	import type { Order, Item } from '$lib/types';

	let admin: boolean;
	let orders: Order[] = [];

	whenLoggedIn(async (user: User) => {
		admin = await isAdmin(user.uid);

		const ordersQuery = query(collection(db, 'orders'));
		const ordersData = await getDocs(ordersQuery);
		ordersData.forEach(async (order) => {
			let orderData: Order = order.data();
			orderData.id = order.id;
			orderData.exists = true;
			orderData.totalPrice = 0;
			if (!orderData.items) return;
			for (let [index, item] of orderData.items.entries()) {
				const itemRef = doc(db, 'items', item.id || '');
				const itemData = await getDoc(itemRef);
				orderData.totalPrice += itemData.data()?.price * (item.quantity || 1);
				orderData.items[index] = { ...item, ...itemData.data() };
			}

			// console.log()
			orders.push({ ...orderData });
			orders = orders;
		});
		console.log(orders);
	});

	function done(order: Order) {
		removeOrder(order);
	}

	function removeOrder(order: Order) {
		const orderRef = doc(db, 'orders', order.id || '');
		deleteDoc(orderRef);
		order.exists = false;
		// console.log(orders);
		orders = orders;
	}
</script>

<!-- <h1>{admin}</h1> -->

<div class="flex gap-6 flex-col">
	{#each orders as order}
		{#if order.exists}
			<div>
				<h2 class="text-xl">products</h2>
				<ul>
					{#each order.items || [] as item}
						<li>
							{item.name} X {item.quantity}
						</li>
					{/each}
				</ul>
				<p>price: {order.totalPrice}</p>
				<div>
					<button
						on:click={() => {
							removeOrder(order);
						}}
						class="bg-slate-200 p-3 rounded">cancel</button
					>
					<button on:click={() => done(order)} class="bg-slate-200 p-3 rounded"
						>done</button
					>
				</div>
			</div>
		{/if}
	{/each}
</div>
