import { auth } from '$lib/firebase';

export async function whenLoggedIn(f: Function) {
	auth.onAuthStateChanged(async (user) => {
		if (user) {
			f(user);
		}
	});
}
