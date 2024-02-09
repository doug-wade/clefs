export default function clefs(layers) {
	const api = getApiUnion(layers);
	const handler = getHandler(api, layers);

	return new Proxy({}, handler);
}

function getHandler(api, layers) {
	return {
		get(target, name) {
			if (api.has(name)) {
				return (...arguments_) => {
					const promises = [];
					for (const layer of layers) {
						promises.push(layer[name](...arguments_));
					}

					if (layers.length === 1) {
						return promises[0];
					}

					if (name === 'readFile') {
						return Promise.race(promises);
					}

					if (name === 'writeFile') {
						return Promise.all(promises);
					}
				};
			}
		},
	};
}

function getApiUnion() {
	return new Set(['readFile', 'writeFile']);
}
