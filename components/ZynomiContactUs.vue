<template>
  <div class="grid grid-flow-row auto-rows-max" v-if="props.organization"> 
  <div class="mt-8 xl:mt-0  pl-6 pr-4 pb-2 rounded-xl" :class="[`bg-[${useThemeStore().palette('600')}]`]">
    <div class="md:grid md:grid-cols-1">
      <div class="">
        <dl class="mt-2 text-base text-white">
          <div>
            <h4 class="text-md leading-5 font-bold tracking-wider text-white uppercase pt-4 lg:pt-0">Contact Us</h4>
            <dt class="sr-only">Postal address</dt>
            <dd class="pt-3">
              <p>{{ props.organization.company_name }}</p>
              <p>{{ props.organization.address.apartment }} {{ props.organization.address.street }}</p>
              <p>{{ props.organization.address.city }} - {{ props.organization.address.postal_code }}</p>
              <p>{{ props.organization.address.state }} {{ props.organization.address.country_name }}</p>
            </dd>

            <dt class="sr-only">Phone number</dt>
            <dd class="flex">
              <!-- Heroicon name: phone -->
              <svg class="flex-shrink-0 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="ml-3">
                {{ props.organization.phone_number }}
              </span>
            </dd>

            <dt class="sr-only">Email</dt>
            <dd class="flex">
              <!-- Heroicon name: mail -->
              <svg class="flex-shrink-0 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="ml-3">
                {{ props.organization.company_email }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  </div>
</template>
<script setup>
const props = defineProps(['organization']);
import { useThemeStore } from '~/stores/theme';
</script>
