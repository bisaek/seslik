import { describe, it, expect } from 'vitest';
import { isAdmin } from './firebaseFun';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', async () => {
		expect(await isAdmin('Wxwi4xRGhuMximfSZZSdlXe3kNB3')).toBe(true);
	});
});
