<script lang="ts">
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from './firebase';
	import type { Item } from './types';
	export let item: Item;
	function updateStock(increaseNumber: number) {
		if (!item.stocks) item.stocks = 0;
		item.stocks += increaseNumber;
		console.log(item.id);
		const itemRef = doc(db, 'items', item.id || '');
		setDoc(itemRef, { stocks: item.stocks }, { merge: true });
		console.log(item.stocks);
	}
</script>

<p>stocks: {item.stocks}</p>
<span class="bg-slate-100 rounded-full">
	<button class="py-2 px-3" on:click={() => updateStock(1)}>+</button>
	<button class="py-2 px-3" on:click={() => updateStock(-1)}>-</button>
</span>
