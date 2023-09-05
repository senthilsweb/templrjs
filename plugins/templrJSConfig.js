import { usePropertiesStore } from '~/stores/properties';
import { useNavigationsStore } from '~/stores/navigations';
import { useCountryStore } from '~/stores/country';
import { useCompanyStore } from '~/stores/company';
export default defineNuxtPlugin(async (nuxtApp) => {
  //if (process.client) {
    //Populate properties master data
    const propertiesStore = usePropertiesStore();
    const navigationsStore = useNavigationsStore();
    const countryStore = useCountryStore();
    const companyStore = useCompanyStore();

    //1) Properties
    propertiesStore.loadPropertiesIfNeeded();
    //2) Country
    countryStore.loadCountriesIfNeeded();
    //3) Company
    companyStore.loadCompnyIfNeeded();
    //3) Navigation
    navigationsStore.loadNavigationsIfNeeded();
  //}
});
