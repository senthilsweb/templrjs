<template>
    <div>
        <h5 class="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">On this page</h5>
        <ol role="list" class="mt-4 space-y-3 text-sm">
            <li v-for="link of data" :key="link.id">
                <h3>
                    <a :href="`#${link.id}`" class="text-sky-500">{{ link.text }}</a>
                </h3>
            
                <ol v-if="link.children" role="list" class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                    <li v-for="link of link.children" :key="link.id" >
                        <a :href="`#${link.id}`" class="hover:text-slate-600 dark:hover:text-slate-300">{{ link.text }}</a>
                    </li>
            </ol>
        </li>
        </ol>
        <!--<ul>
            <li v-for="link of data" :key="link.id" :class="{ 'pl-8': link.depth === 3, 'pl-5 font-bold': link.depth === 2 }" class="group flex items-center px-3 text-sm leading-8 hover:text-gray-900 text-gray-500">
                
                <ul v-if="link.children">
                    <li v-for="link of link.children" :key="link.id" :class="{ 'pl-8': link.depth === 3, 'pl-5 font-bold': link.depth === 2 }" class="group flex items-center px-3 text-sm leading-8 hover:text-gray-900 text-gray-500">
                        <a :href="`#${link.id}`">{{ link.text }}</a>
                    </li>
                </ul>
            </li>
        </ul>-->
    </div>
    </template>
    
    <script>
    export default {
        name: "toc",
        data() {
            return {
                
            }
        },
        props: {
            data: Array
        },
        methods: {
    
        }, 
        created() {
            
        },
    }
    </script>
    