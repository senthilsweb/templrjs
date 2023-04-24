import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	//console.log(`${useRuntimeConfig().GOOGLE_MAP_TOKEN}`);
	//console.log("GOOGLE_MAP_TOKEN:", config.GOOGLE_MAP_TOKEN);
	nuxtApp.vueApp.use(VueGoogleMaps, {
		load: {
			key: "AIzaSyAx35ysIqEC8kTIAeJ5mwDrwYimMpGPEKk",
		},
		autobindAllEvents: true,
	});
});
