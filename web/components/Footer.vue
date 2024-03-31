<template>
  <div class="" :class="[`bg-[${useThemeStore().palette('400')}]`, `lg:max-w-8xl`]">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-3">
        <!--Footer Links (Start)-->
        <TemplrJSFooterLinks module_name="footer-links"/>
        <!--Footer Links (end)-->
        <!--Contact Us (Start)-->
        <TemplrJSContactUs :organization="useCompanyStore().organization" />
        <!--Contact Us (End)-->
      </div>
      <div class="mt-8 border-t border-white pt-8 md:flex md:items-center md:justify-between">
        <TemplrJSSocialLinks module_name="social-media-links" />
        <p class="mt-8 text-white text-base leading-6 md:mt-0 md:order-1">
          {{ usePropertiesStore().app_copyright }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';
import { useCompanyStore } from "~/stores/company";
import { useThemeStore } from '~/stores/theme';
console.log("organization control = ", JSON.stringify(useCompanyStore().organization))
</script>
