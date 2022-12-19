import { auth } from 'src/routes/firebase';

async function whenLoggedIn(f: Function) {
	auth.onAuthStateChanged(async (user) => {
		if (user) {
			f(user);
		}
	});
}
