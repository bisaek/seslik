import { auth, db } from '$lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export async function whenLoggedIn(f: Function) {
	auth.onAuthStateChanged(async (user) => {
		if (user) {
			f(user);
		}
	});
}
export async function whenNotLoggedIn(f: Function) {
	auth.onAuthStateChanged(async (user) => {
		if (!user) {
			f(user);
		}
	});
}
export async function isAdmin(userId: string) {
	const adminQuery = query(collection(db, 'admin'));
	const admins = await getDocs(adminQuery);
	let result = false;
	admins.forEach((admin) => {
		if (admin.id == userId) result = true;
	});
	return result;
}
