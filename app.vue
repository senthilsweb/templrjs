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
// use Pinia store:

const propertiesStore = usePropertiesStore();
const navigationsStore = useNavigationsStore();
const countryStore = useCountryStore();


//#############################################################################################
//Populate properties master data

//1) Properties

const properties = await useProperties();
propertiesStore.reloadProperties(properties.data._rawValue);
//console.log(JSON.stringify(properties.data._rawValue))
//console.log('propertiesStore.properties_by_parent_code = ', JSON.stringify(propertiesStore.properties_by_parent_code('gender'))); //Debug code

//2) Country

//Populate countries master data
const countries = await useCountry();
countryStore.reloadCountry(countries.data._rawValue);
//console.log(JSON.stringify(countries.data._rawValue))
//console.log('countries.data._rawValue = ', JSON.stringify(countries.data._rawValue)); //Debug code

//3) Company

//Populate Company master data
const company = await useCompany(); 
//console.log(JSON.stringify(company.data._rawValue))
if (company.data._rawValue.length > 0) useCompanyStore().updateCompany(company.data._rawValue[0]);

//4) Navigation
//Populate navigations store
const parent_nav = await useParentNav();
const child_nav = await useChildNav();
//console.log('parent_nav.data._rawValue = ', JSON.stringify(parent_nav.data._rawValue)); //Debug code
//console.log('child_nav.data._rawValue = ', JSON.stringify(child_nav.data._rawValue)); //Debug code
navigationsStore.reloadNavigations(useUnion(child_nav.data._rawValue, parent_nav.data._rawValue));
//console.log(JSON.stringify(parent_nav.data._rawValue))
//console.log(JSON.stringify(child_nav.data._rawValue))
//console.log('navigationsStore.navigatioins_by_module = ', JSON.stringify(navigationsStore.navigatioins_by_module('landing-page'))); //Debug code
//#############################################################################################

const page_meta = [];

propertiesStore.properties_by_parent_code('social-media-head-metadata').forEach((metadata) => {
  page_meta.push({ hid: metadata.code, property: metadata.code, content: metadata.name });
});

//console.log('social-media-head-metadata',JSON.stringify(propertiesStore.properties_by_parent_code('social-media-head-metadata')))

useHead({
  title: propertiesStore.app_page_head_title,
  description: propertiesStore.app_page_head_title,
  meta: page_meta,
  /*meta: [
		{
			name: "description",
			content: "Corporate intranet application",
		},
		{
			property: "og:title",
			content: "Corporate intranet application",
		},
		{
			property: "og:description",
			content: "Corporate intranet application",
		},
		{
			property: "og:image",
			content: "/logo.png",
		},
		{
			property: "og:type",
			content: "website",
		},
		{
			property: "og:site_name",
			content: "templrjs",
		},
	],*/
  script: [
    {
      hid: 'underscore',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.4/underscore-min.js',
      defer: true,
    },
    {
      hid: 'chartjs',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
      defer: true,
    },
  ],
});
</script>
<style>
.zyn-button
 {
  @apply relative inline-flex items-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out;
}
.zyn-button-contrast
 {
  @apply  bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:border-lime-700  active:bg-lime-700;
}
.zyn-login-button
{
  @apply  justify-center py-2;
}
.zyn-swatch-button
{
  @apply relative inline-flex h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary-500 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75;
}
.zyn-swatch-unselected
{
  @apply  bg-primary-500;
}
.zyn-swatch-selected
{
  @apply  bg-primary-800;
}
.zyn-nav-action-button
{
  @apply ring-2 ring-primary-500 bg-primary-500 hover:bg-primary-700 text-white
}
.zyn-nav-action-button-bordered
{
  @apply ring-2 ring-primary-500 hover:bg-primary-700 text-primary-500 hover:text-white
}
</style>
