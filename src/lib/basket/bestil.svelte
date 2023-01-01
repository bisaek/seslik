<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import {
		addDoc,
		collection,
		doc,
		getDoc,
		getDocs,
		query,
		setDoc
	} from 'firebase/firestore';
	import type { Item } from '$lib/types';
	import { whenLoggedIn } from '$lib/firebaseFun';
	import type { User } from 'firebase/auth';

	// export let items = [];
	let lervering = false;
	let roomNumber: number | null = null;
	let name: string;
	let elevNr: number;

	whenLoggedIn(async (user: User) => {
		const userDataRef = doc(db, 'users', user.uid);
		const userData = await getDoc(userDataRef);
		roomNumber = userData.data()?.roomNumber;
		name = userData.data()?.name;
		elevNr = userData.data()?.elevNr;
		console.log(userData.data());
	});

	async function order() {
		console.log();
		if (!auth.currentUser) return;
		try {
			const itemsQuery = query(
				collection(db, 'users', auth.currentUser.uid, 'bag')
			);
			const userRef = doc(db, 'users', auth.currentUser.uid);
			const itemsData = await getDocs(itemsQuery);
			let items: Item[] = [];
			itemsData.forEach((item) =>
				items.push({ id: item.id, quantity: item.data().quantity })
			);

			await addDoc(collection(db, 'orders'), {
				items,
				roomNumber,
				name,
				elevNr,
				lervering
			});
			if (roomNumber)
				await setDoc(userRef, { roomNumber, name, elevNr }, { merge: true });
			else await setDoc(userRef, { name, elevNr }, { merge: true });
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
					bind:value={roomNumber}
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
				bind:value={name}
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
				bind:value={elevNr}
			/>
		</div>
		<div class="mb-4">
			<button class="bg-gray-300 rounded-full px-4 py-2" type="submit"
				>Bestil</button
			>
		</div>
	</form>
</div>
