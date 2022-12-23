<script>
	import { auth, db } from '$lib/firebase';
	import { addDoc, collection, doc } from 'firebase/firestore';

	// export let items = [];
	let lervering = false;

	async function bestil() {
		console.log(items);
		if (!auth.currentUser) return;
		const items = await 
		const orderRef = await addDoc(collection(db, 'items'), { items });
	}
</script>

<div>
	<h1 class="text-3xl font-bold text-center text-white mb-4">Check Out</h1>

	<form class="bg-gray-200 shadow-md rounded-md p-4">
		<div class="mb-4">
			<label class="font-bold mb-2 text-gray-700" for="name">Lervering</label>
			<input
				bind:checked={lervering}
				type="checkbox"
				id="lervering"
				name="lervering"
				required
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
			<button
				class="bg-gray-300 rounded-full px-4 py-2"
				on:click={bestil}
				type="submit">Bestil</button
			>
		</div>
	</form>
</div>
