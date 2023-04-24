<template>
    <div class="flex flex-wrap w-full max-w-7xl max-h-screen mx-auto justify-center bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100">    
 
  
      <div class="w-full max-w-4xl mx-12 my-12">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-1/2 cursor-pointer">
          <li class="flex w-auto">
            <a class="text-base font-normal items-center justify-center space-y-5 px-5 py-3 group group-hover:text-pink-500"
            v-on:click="toggleTabs(1)" v-bind:class="{'text-gray-500 ': openTab !== 1, 'hover:text-pink-500 duration-500 text-gray-300': openTab === 1}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><mask id="ipTBadge0">
              <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
              <path d="M38 22v18H8V10h18"/><path fill="#555" d="M38 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTBadge0)"/></svg>
              <p>Simple</p>
            </a>
          </li>
          <li class="flex w-auto">
            <a class="text-base font-normal items-center justify-center space-y-5 px-5 py-3 group group-hover:text-pink-500"
            v-on:click="toggleTabs(2)" v-bind:class="{'text-gray-500 ': openTab !== 2, 'hover:text-pink-500 duration-500 text-gray-300': openTab === 2}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><mask id="ipTCirclesSeven0">
              <path fill="#555" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm10.392-10a4 4 0 1 0 6.929-4a4 4 0 0 0-6.928 4Zm0 12a4 4 0 1 0 6.929 4a4 4 0 0 0-6.928-4ZM24 36a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm-10.392-6a4 4 0 1 0-6.928 4a4 4 0 0 0 6.928-4Zm0-12a4 4 0 1 0-6.928-4a4 4 0 0 0 6.928 4Z" clip-rule="evenodd"/></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTCirclesSeven0)"/></svg>
              <p>Elegant</p>
            </a>
          </li>
          <li class="flex w-auto">
            <a class="text-base font-normal items-center justify-center space-y-5 px-5 py-3 group group-hover:text-pink-500"
            v-on:click="toggleTabs(3)" v-bind:class="{'text-gray-500 ': openTab !== 3, 'hover:text-pink-500 duration-500 text-gray-300': openTab === 3}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><mask id="ipTFullScreenPlay0">
              <g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M16 40H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v6"/>
              <path fill="#555" d="M42 24H26a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V26a2 2 0 0 0-2-2Z"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTFullScreenPlay0)"/></svg>
              <p>Playfull</p>
       
            </a>
          </li>
          <li class="flex w-auto">
            <a class="text-base font-normal items-center justify-center space-y-5 px-5 py-3 group group-hover:text-pink-500"
            v-on:click="toggleTabs(4)" v-bind:class="{'text-gray-500 ': openTab !== 4, 'hover:text-pink-500 duration-500 text-gray-300': openTab === 4}">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><mask id="ipTNestedArrows0">
              <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
                <path d="M30 17V4H4v26h13"/><path fill="#555" d="M43 43V17H17v26h26Z"/><path d="M33 30H17m16 0l-5-5l5 5Zm0 0l-5 5l5-5ZM17 17v26"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTNestedArrows0)"/></svg>
                <p>Brutalist</p>
            </a>
          </li>
          
        </ul>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <div class="flex">
                    <div class="flex-none w-48 relative">
                        <img src="https://res.cloudinary.com/lamcom/image/upload/v1675780408/tabs/woman_ydmpur.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </div>
                    <form class="flex-auto p-6">
                        <div class="flex flex-wrap">
                        <h1 class="flex-auto text-lg font-semibold text-slate-900">
                            Classic Utility Jacket
                        </h1>
                        <div class="text-lg font-semibold text-slate-500">
                            $110.00
                        </div>
                        <div class="w-full flex-none text-lg font-semibold text-slate-500 mt-2">
                            In stock
                        </div>
                        </div>
                        <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div class="space-x-2 flex text-sm">
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xs" checked />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XS
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="s" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                S
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="m" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                M
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="l" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                L
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xl" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XL
                            </div>
                            </label>
                        </div>
                        </div>
                        <div class="flex space-x-4 mb-6 text-sm font-medium">
                        <div class="flex-auto flex space-x-4">
                            <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Buy now
                            </button>
                            <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Add to bag
                            </button>
                        </div>
                        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                        </div>
                        <p class="text-sm text-slate-700">
                        Free shipping on all continental US orders.
                        </p>
                    </form>
                    </div>
              </div>
              <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <div class="flex">
                    <div class="flex-none w-48 relative">
                        <img src="https://res.cloudinary.com/lamcom/image/upload/v1675780410/tabs/man_j13mvi.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </div>
                    <form class="flex-auto p-6">
                        <div class="w-full">
                          <div class="flex flex-1">
                        <h1 class="flex-auto text-lg font-semibold text-slate-900">
                            Man Utility Jacket
                        </h1>                        
                        <h1 class="flex-auto text-right text-sm font-medium text-slate-900">
                           In Stock
                        </h1> 
                      </div> 
                        <div class="text-lg font-semibold text-slate-500">
                            $350.00
                        </div>
                        </div>
                        <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div class="space-x-2 flex text-sm">
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xs" checked />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XS
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="s" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                S
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="m" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                M
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="l" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                L
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xl" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XL
                            </div>
                            </label>
                        </div>
                        </div>
                        <div class="flex space-x-4 mb-6 text-sm font-medium">
                        <div class="flex-auto flex space-x-4">
                            <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Buy now
                            </button>
                            <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Add to bag
                            </button>
                        </div>
                        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                        </div>
                        <p class="text-sm text-slate-700">
                        Free shipping on all continental US orders.
                        </p>
                    </form>
                    </div>
              </div>
              <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <div class="flex">
                    <div class="flex-none w-48 relative">
                        <img src="https://res.cloudinary.com/lamcom/image/upload/v1675780408/tabs/kids_hbjbsb.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </div>
                    <form class="flex-auto p-6">
                        <div class="flex flex-wrap">
                        <h1 class="flex-auto text-lg font-semibold text-slate-900">
                           Kids Jumpsuit
                        </h1>
                        <div class="text-lg font-semibold text-slate-500">
                            $39.00
                        </div>
                        <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                            In stock
                        </div>
                        </div>
                        <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div class="space-x-2 flex text-sm">
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xs" checked />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XS
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="s" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                S
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="m" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                M
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="l" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                L
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xl" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XL
                            </div>
                            </label>
                        </div>
                        </div>
                        <div class="flex space-x-4 mb-6 text-sm font-medium">
                        <div class="flex-auto flex space-x-4">
                            <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                            Buy now
                            </button>
                            <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Add to bag
                            </button>
                        </div>
                        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                        </div>
                        <p class="text-sm text-slate-700">
                        Free shipping on all continental US orders.
                        </p>
                    </form>
                    </div>
              </div>
              <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                <div class="flex">
                    <div class="flex-none w-48 relative border-l-4 border-b-4 border-green-600">
                        <img src="https://res.cloudinary.com/lamcom/image/upload/v1675780610/tabs/shoe_eqt36r.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    </div>
                    <form class="flex-auto p-6">
                        <div class="flex flex-wrap">
                        <h1 class="flex-auto text-lg font-semibold text-green-600">
                          Brutalist
                        </h1>
                        <div class="text-lg font-semibold text-slate-500">
                            $89.00
                        </div>
                        <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                            In stock
                        </div>
                        </div>
                        <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div class="space-x-2 flex text-sm">
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xs" checked />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XS
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="s" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                S
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="m" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                M
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="l" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                L
                            </div>
                            </label>
                            <label>
                            <input class="sr-only peer" name="size" type="radio" value="xl" />
                            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                XL
                            </div>
                            </label>
                        </div>
                        </div>
                        <div class="flex space-x-4 mb-6 text-base font-medium">
                        <div class="flex-auto flex space-x-4">
                            <button class="h-16 px-6 font-semibold rounded-lg bg-green-500 text-white" type="submit">
                            Buy now
                            </button>
                            <button class="h-16 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                            Add to bag
                            </button>
                        </div>
                        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                        </div>
                        <p class="text-sm text-slate-700">
                        Free shipping on all continental US orders.
                        </p>
                    </form>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </template>
  
  <script>

  export default {
    name: "pink-tabs", 
    data() {
      return {
        openTab: 1      }
      
    },
    methods: {
      toggleTabs: function(tabNumber){
        this.openTab = tabNumber
      }
    }
  }

  </script>