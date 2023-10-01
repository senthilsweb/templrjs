<template>
  <div class="relative flex items-center">
    <!-- Logo -->
    <div class="flex-shrink-0">
      <a href="/">
        <IconLogo logo_url="/logo.svg" />
      </a>
    </div>

    <!-- Spacer to push the navigation to the center -->
    <div class="flex-grow"></div>

    <!-- Menu Links -->
    <nav class="hidden md:flex md:items-center md:space-x-4">
      <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <li v-for="(item, idx) in useSortBy(navs, ['sort_order'])" :key="`mnu_${idx}`">
          <a v-if="!item.is_action_button && !item.children && item.is_active" :href="item.href" class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400" :class="{ 'text-teal-500 dark:text-teal-400': isActive(item.href) }">
            {{ item.name }}
            <span v-if="isActive(item.href)" class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Another spacer to ensure the nav stays centered -->
    <div class="flex-grow"></div>

   <!-- MobileNavigation template goes here... -->
<div class="flex items-center space-x-4 lg:hidden">
  <Popover v-model="useState('isMobileNavVisible').value">
    <PopoverButton @click="useState('isMobileNavVisible').value = !useState('isMobileNavVisible').value" class="group flex items-center px-4 py-2 text-sm font-medium text-zinc-800  dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
      
      <Icon name="akar-icons:two-line-horizontal" class="ml-3 h-8 w-8 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
    </PopoverButton>
    <PopoverOverlay v-if="useState('isMobileNavVisible').value" class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
    <PopoverPanel v-if="useState('isMobileNavVisible').value" class="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
      <div class="flex flex-row-reverse items-center justify-between">
        <div class="-mr-2">
            <button type="button" @click="useState('isMobileNavVisible').value = !useState('isMobileNavVisible').value" class="bg-gray-200 rounded-full p-2 inline-flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        <h2 class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
      </div>
      <nav class="mt-6">
        <ul class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
          <li v-for="(item, idx) in useSortBy(navs, ['sort_order'])" :key="`mob_mnu_${idx}`">
            <template v-if="!item.is_action_button">
              <a :href="item.href" class="block py-2">{{ item.name }}</a>
            </template>
          </li>
        </ul>
      </nav>
    </PopoverPanel>
  </Popover>
</div>

  </div>
  
</template>

<script setup>
import { Popover, PopoverOverlay, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const isMobileNavVisible = useState('isMobileNavVisible', () => ref(false));
import { useNavigationsStore } from '~/stores/navigations';
const navs = useNavigationsStore().navigatioins_by_module('landing-page');
// Placeholder icons - you can replace these with actual SVG components or other icons
const ChevronDownIcon = {
  template: `<span>⬇</span>`, // Placeholder
};
const CloseIcon = {
  template: `<span>X</span>`, // Placeholder
};

const router = useRouter();
const currentPath = ref(router.currentRoute.value.path);

router.afterEach((to) => {
  currentPath.value = to.path;
});

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/uses', label: 'Uses' },
];

const linkClass = (href) => {
  if (currentPath.value === href) {
    return 'py-2 px-4 bg-white dark:bg-gray-800 rounded-full text-teal-500 dark:text-teal-400';
  }
  return 'py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full hover:text-teal-500 dark:hover:text-teal-400';
};

const isActive = (href) => currentPath.value === href;
const open = ref(false);


</script>

<style scoped>
/* TailwindCSS Styles */
</style>
