import test from 'ava';
import clefs from './src/index.js';

test('returns a proxy', t => {
	t.assert(typeof clefs([]) === 'object');
});
