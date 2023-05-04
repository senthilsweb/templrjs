<template>
  <div class="mx-auto">
    <div class="min-h-screen relative">
      <div class="h-full relative">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePropertiesStore } from '~/stores/properties';
import { useNavigationsStore } from '~/stores/navigations';
import { useCountryStore } from '~/stores/country';
import { useCompanyStore } from '~/stores/company';
console.log('--------------------------------------->>>>>app.vue');
console.log(`TEMPLRJS_WEBSITE_CONFIG_STORE = [${process.env.TEMPLRJS_WEBSITE_CONFIG_STORE}]`);

//#############################################################################################
//Populate properties master data
const propertiesStore = usePropertiesStore();
const navigationsStore = useNavigationsStore();
const countryStore = useCountryStore();
const companyStore = useCompanyStore();

//1) Properties
if (!propertiesStore.loaded) {
  console.log('1) Loading Properties Store-------------------------->>>');
  const properties = await useProperties();
  console.log('process.env.TEMPLRJS_WEBSITE_CONFIG_STORE=', process.env.TEMPLRJS_WEBSITE_CONFIG_STORE);
  if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'dbms') {
    console.log('From remote');
    propertiesStore.reloadProperties(properties.data._rawValue);
  } else if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'http') {
    console.log('From local');
    propertiesStore.reloadProperties(JSON.parse(properties.data._rawValue));
  }
  console.log('Loaded Properties Store');
  //console.log('propertiesStore.properties_by_parent_code = ', propertiesStore.properties_by_parent_code('social-media-head-metadata')); //Debug code
}

//2) Country

if (!countryStore.loaded) {
  console.log('2) Loading Country Store-------------------------->>>');
  const countries = await useCountry();

  if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'dbms') {
    console.log('From remote');
    countryStore.reloadCountry(countries.data._rawValue);
  } else if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'http') {
    console.log('From local');
    countryStore.reloadCountry(JSON.parse(countries.data._rawValue));
  }

  console.log('Loaded Country Store');
}

//3) Company

if (!companyStore.loaded) {
  console.log('3) Loading Company Store-------------------------->>>');
  const company = await useCompany();

  if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'dbms') {
    console.log('From remote');
    companyStore.reloadCompany(company.data._rawValue[0]);
  } else if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'http') {
    console.log('From local');
    companyStore.reloadCompany(JSON.parse(company.data._rawValue)[0]);
  }

  console.log('Loaded Company Store');
}

//4) Navigation
if (!navigationsStore.loaded) {
  console.log('4) Loading Navigations Store-------------------------->>>');
  const parent_nav = await useParentNav();
  const child_nav = await useChildNav();
  //console.log('parent_nav.data._rawValue = ', JSON.stringify(parent_nav.data._rawValue)); //Debug code
  //console.log('child_nav.data._rawValue = ', JSON.stringify(child_nav.data._rawValue)); //Debug code

  if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'dbms') {
    console.log('From remote');
    navigationsStore.reloadNavigations(useUnion(child_nav.data._rawValue, parent_nav.data._rawValue));
  } else if (process.env.TEMPLRJS_WEBSITE_CONFIG_STORE != undefined && process.env.TEMPLRJS_WEBSITE_CONFIG_STORE == 'http') {
    console.log('From local');
    navigationsStore.reloadNavigations(useUnion(JSON.parse(child_nav.data._rawValue), JSON.parse(parent_nav.data._rawValue)));
  }

  //console.log('navigationsStore.navigatioins_by_module = ', JSON.stringify(navigationsStore.navigatioins_by_module('landing-page'))); //Debug code
  console.log('Loaded Navigations Store');
}
//#############################################################################################

const page_meta = [];
</script>
<style>
.zyn-button {
  @apply relative inline-flex items-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out;
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
.zyn-nav-action-button-bordered {
  @apply ring-2 ring-primary-500 hover:bg-primary-700 text-primary-500 hover:text-white;
}
</style>
