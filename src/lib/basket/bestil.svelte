<script>
	import { auth, db } from '$lib/firebase';
	import { addDoc, collection, doc, getDocs, query } from 'firebase/firestore';

	// export let items = [];
	let lervering = false;

	async function order() {
		console.log();
		if (!auth.currentUser) return;
		try {
			const itemsQuery = query(
				collection(db, 'users', auth.currentUser.uid, 'bag')
			);
			const itemsData = await getDocs(itemsQuery);
			let items = [];
			itemsData.forEach((item) =>
				items.push({ id: item.id, quantity: item.data().quantity })
			);

			const orderRef = await addDoc(collection(db, 'orders'), { items });
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div>
	<h1 class="text-3xl font-bold text-center text-white mb-4">Check Out</h1>

	<form
		class="bg-gray-200 shadow-md rounded-md p-4"
		on:submit|preventDefault={order}
	>
		<div class="mb-4">
			<label class="font-bold mb-2 text-gray-700" for="name">Lervering</label>
			<input
				bind:checked={lervering}
				type="checkbox"
				id="lervering"
				name="lervering"
			/>
		</div>
		{#if lervering}
			<div class="mb-4">
				<label class="block font-bold mb-2 text-gray-700" for="værelse"
					>Værelse nr.</label
				>
				<input
					class="bg-gray-300 rounded-full px-4 py-2 w-full"
					type="number"
					id="værelse"
					name="værelse"
					required
				/>
			</div>
		{/if}
		<div class="mb-4">
			<label class="block font-bold mb-2 text-gray-700" for="name">Navn</label>
			<input
				class="bg-gray-300 rounded-full px-4 py-2 w-full"
				type="text"
				id="name"
				name="name"
				required
			/>
		</div>
		<div class="mb-4">
			<label class="block font-bold mb-2 text-gray-700" for="ElevNr"
				>Elev nr</label
			>
			<input
				class="bg-gray-300 rounded-full px-4 py-2 w-full"
				type="text"
				id="ElevNr"
				name="ElevNr"
				required
			/>
		</div>
		<div class="mb-4">
			<button class="bg-gray-300 rounded-full px-4 py-2" ¨ type="submit"
				>Bestil</button
			>
		</div>
	</form>
</div>
