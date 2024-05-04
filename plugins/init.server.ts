import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', async () => {
    const config = useRuntimeConfig();
    // Since this hook is called, it implies the app was created; thus, accessing stores or other features should be safe.
    const propertiesStore = usePropertiesStore();
    const navigationsStore = useNavigationsStore();
    const companyStore = useCompanyStore();
    const countryStore = useCountryStore();

    await propertiesStore.loadPropertiesIfNeeded(config.public);
    await navigationsStore.loadNavigationsIfNeeded(config.public);
    await companyStore.loadCompanyIfNeeded(config.public);
    await countryStore.loadCountriesIfNeeded(config.public);
  });
});
