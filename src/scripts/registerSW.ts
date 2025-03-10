
const swAllowedHostnames: string[] = ["localhost", "127.0.0.1"];

async function registerSW(): Promise<void> {
	if (
		location.protocol !== "https:" &&
		!swAllowedHostnames.includes(location.hostname)
	) {
		throw new Error("Service workers cannot be registered without https.");
	}

	if (!navigator.serviceWorker) {
		throw new Error("Your browser doesn't support service workers.");
	}

	try {
		await navigator.serviceWorker.register("sw.js");

		const connection = new self.BareMux.BareMuxConnection("/baremux/worker.js");
		const wispUrl = (location.protocol === 'https:' ? 'wss://' : 'ws://') +
		location.host + '/wisp/';

		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	} catch (error) {
		console.error("Failed to register service worker:", error);
	}
}

export { registerSW };