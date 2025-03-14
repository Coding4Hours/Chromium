importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");
importScripts("/workerware/index.js");
importScripts("/plugins/alublocker.js");

const ww = new WorkerWare({
	debug: true,
});

ww.use({
	// Required
	function: self.adblockExt.filterRequest,
	// Required, can take in multiple events!
	events: ["fetch"],
	// Optional, defaults to function.prototype.name, or is set to a random string if randomNames is set to true.
	name: "Adblock",

});

const uv = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
	event.respondWith(
		(async () => {
			if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
				return await uv.fetch(event);
			}

			return await fetch(event.request);
		})(),
	);
});
