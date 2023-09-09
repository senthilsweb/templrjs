<template>
  <div class="mx-auto" id="app">
    <div class="min-h-screen relative">
      <div class="h-full relative">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
const page_meta = [];

import { usePropertiesStore } from '~/stores/properties';
import { useNavigationsStore } from '~/stores/navigations';
import { useCountryStore } from '~/stores/country';
import { useCompanyStore } from '~/stores/company';

const propertiesStore = usePropertiesStore();
const navigationsStore = useNavigationsStore();
const countryStore = useCountryStore();
const companyStore = useCompanyStore();


let properties_query = `/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/properties%22},%22only%22:[%22body%22]}`;
const properties = await useFetch(properties_query, {
  method: 'get',
});
propertiesStore.reloadProperties(properties.data._rawValue[0].body);

let countries_query = `/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/countries%22},%22only%22:[%22body%22]}`;
const countries = await useFetch(countries_query, {
  method: 'get',
});
countryStore.reloadCountry(countries.data._rawValue[0].body);

let company_query = `/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/company%22},%22only%22:[%22body%22]}`;
const company = await useFetch(company_query, {
  method: 'get',
});
companyStore.reloadCompany(company.data._rawValue[0].body[0]);


let query_child = '/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/child_nav%22},%22only%22:[%22body%22]}';
const child = await useFetch(query_child, {
  method: 'get',
});

let query_parent = '/api/_content/query?_params={%22where%22:{%22_path%22:%22/configs/parent_nav%22},%22only%22:[%22body%22]}';
const parent = await useFetch(query_parent, {
  method: 'get',
});
navigationsStore.reloadNavigations(useUnion(child.data._rawValue[0].body, parent.data._rawValue[0].body));


</script>
<style>
.zyn-button {
  @apply relative inline-flex items-center border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out;
}
.zyn-secondary-button {
  @apply relative flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:border-secondary-700 active:bg-secondary-700 transition duration-150 ease-in-out;
}
.zyn-button-contrast {
  @apply bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:border-lime-700  active:bg-lime-700;
}
.zyn-login-button {
  @apply justify-center py-2;
}
.zyn-swatch-button {
  @apply relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-500 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75;
}
.zyn-swatch-unselected {
  @apply bg-primary-500;
}
.zyn-swatch-selected {
  @apply bg-primary-800;
}
.zyn-nav-action-button {
  @apply ring-2 ring-primary-500 bg-primary-500 hover:bg-primary-700 text-white;
}
.zyn-search-button {
  @apply bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600;
}
.zyn-nav-action-button-bordered {
  @apply ring-2 ring-primary-500 hover:bg-primary-700 text-primary-500 hover:text-white;
}
</style>
