<template>

    <!-- Secondary sidebar (Start)-->
    <nav aria-label="Sections"
        class="hidden flex-shrink-0 w-96 bg-white border-r border-primary-gray-200 xl:flex xl:flex-col">
        <div class="flex-shrink-0 h-16 px-6 border-b border-primary-200 flex items-center">
            <p class="text-lg font-medium text-gray-900">Settings</p>
        </div>
        <div class="flex-1 min-h-0 overflow-y-auto">
            <!-- Current: "bg-primary-50 bg-opacity-50", Default: "hover:bg-primary-50 hover:bg-opacity-50" -->
            <template v-for="(menu) in items">
                <a v-if="!menu.hidden" :key="menu.link" :href="menu.link" class="flex p-6 border-b border-primary-200"
                    :class="[menu.selected == true ? 'text-primary-900 bg-primary-50 bg-opacity-50' : 'text-primary-700']"
                    aria-current="page">
                    <!-- Heroicon name: outline/cog -->
                    <svg class="text-gray-800 mr-4 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path v-for="(icon, index) in menu.icons" :key="index" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" :d="icon" />
                    </svg>
                    <div class="ml-3 text-sm">
                        <p class="font-medium text-primary-gray-900"
                            :class="[menu.selected == true ? 'font-bold' : 'font-medium']">{{ menu.title }}</p>
                        <p class="mt-1 text-gray-500">{{ menu.description }}</p>
                    </div>
                </a>
            </template>
        </div>
    </nav>


</template>

<script>
//import lefNavLinks from '@/store/admin-navigation.json';

export default {
    components: {

    },
    data() {
        return {
            //lefNavLinks,
            items: this.data,
        };
    },
    props: {
        api: String,
        data: Array
    },
    methods: {},
};
</script>