<template>
    <div>

        <div class="mt-5 flex-grow flex flex-col">
            <nav
                class="flex-1 px-2 space-y-1 bg-white"
                aria-label="Sidebar"
            >

                <ul
                    v-for="(menu,idx) in menuitems.nav"
                    :key="'mobile_mnu_' + idx + '_' + menu.link"
                >
                    <li class="mt-2">
                        <h5 class="mb-4 lg:mb-3 font-semibold text-gray-900 dark:text-gray-200">
                            <a :href="menu.link">
                                {{menu.title}}
                            </a>
                        </h5>
                        <ul
                            v-for="(childmenu,idx) in menu.children"
                            :key="'mnu_' + idx + '_' + childmenu.link"
                            class="space-y-2 lg:space-y-2 border-l border-gray-100 dark:border-gray-800"
                        >
                            <li>
                                <a
                                    class="block border-l pl-4 -ml-px border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                    :href="childmenu.link"
                                >{{childmenu.title}}</a>
                            </li>
                            </ul>
                    </li>
                    </ul>

                    </nav>
        </div>
    </div>

</template>
<script>
import menuitems from "@/store/siteconfig.json";
export default {
  name: "left-nav",
  data() {
    return {
      menuitems,
    };
  },
  props: {
    data: Object,
  },
};
</script>
