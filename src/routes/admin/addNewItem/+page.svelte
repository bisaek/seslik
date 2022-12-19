<script lang="ts">
	import { db } from '$lib/firebase';
	import { addDoc, collection, FieldPath } from 'firebase/firestore';
	import { number, string, z } from 'zod';
	let itemDetails = {
		name: '',
		url: '',
		price: 0,
		stocks: 0
	};
	let test = 0;
	async function addNewItem() {
		try {
			console.log(test);
			console.log(itemDetails);
			const docRef = await addDoc(collection(db, 'items'), itemDetails);
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error(e);
		}
	}
</script>

<form on:submit|preventDefault={addNewItem}>
	<div>
		<label for="name">name: </label>
		<input bind:value={itemDetails.name} />
	</div>
	<div>
		<label for="url">image url: </label>
		<input bind:value={itemDetails.url} type="text" />
	</div>
	<div>
		<label for="price">price: </label>
		<input bind:value={itemDetails.price} type="number" />
	</div>
	<div>
		<label for="stocks">stocks: </label>
		<input bind:value={itemDetails.stocks} type="number" />
	</div>
	<button type="submit">submit</button>
</form>
