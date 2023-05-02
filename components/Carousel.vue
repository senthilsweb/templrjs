<template>
 
    <section>
      <div class="relative">
        <!--Slide Show Elements-->
        <ul id="slider" class="bg-gray-400">
          <div v-for="(item, idx) in active_carousel">
            <li v-if="useState('carousel').value[item.href]" :key="item.name" class="h-[100%] w-[100%] relative transition duration-700 ease-in-out">
              <img class="h-full w-full object-cover animate-blob transition ease-in-out delay-150 animation-delay-4000" :src="item.href" />
              <div class="absolute top-0 left-0 h-full w-full flex">
                <h2 class="text-4xl font-bold my-auto w-full text-white text-center p-20">{{ item.name }}</h2>
              </div>
            </li>
            
          </div>
        </ul>
        <!--End of Slide Show Elements-->
        <!--Button-->
        <div class="absolute px-5 flex w-full h-full top-0 left-0">
          <div class="my-auto w-full flex justify-between">
            <button @click="prev()" class="bg-white p-2 rounded-full bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
            <button @click="next()" class="bg-white p-2 rounded-full bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
        <!--End of Button-->
        <!--Dots section -->
        <div class="absolute flex justify-center items-center space-x-5 w-full bottom-0 left-0 py-10">
          <div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(1)"></div>
          <div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(2)"></div>
          <div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(3)"></div>
          <div class="w-4 h-4 rounded-full cursor-pointer bg-white bg-opacity-80 shadow-lg hover:bg-primary-500 duration-500" onclick="currentSlide(4)"></div>
        </div>
      </div>
    </section>
 
</template>
<script setup>
import { usePropertiesStore } from '~/stores/properties';
import { useNavigationsStore } from '~/stores/navigations';
const c_idx = ref(0);
const c_total = ref(0);
const active_idx = ref(0);
const carousel_assets = useNavigationsStore().navigatioins_by_module('carousel-component');
const active_carousel = useFilter(carousel_assets, { is_active: true });
console.log("--------------------------------------->>>>>Carousel")
c_total.value = active_carousel.length;
const carousel = useState('carousel', () => ref({}));

active_carousel.forEach((item, idx) => {
  //console.log(item.href, '=', idx == 0);
  useState('carousel').value[item.href] = idx == 0;
});

function prev(item) {
  reset();
  if (c_idx.value - 1 >= 0) {
    c_idx.value = c_idx.value - 1;
    useState('carousel').value[active_carousel[c_idx.value].href] = true;
  } else {
    next();
  }
}
function next(item) {
  reset();
  if (c_idx.value + 1 < c_total.value) {
    c_idx.value = c_idx.value + 1;
    useState('carousel').value[active_carousel[c_idx.value].href] = true;
  } else {
    prev();
  }
}
function reset() {
  active_carousel.forEach((item, idx) => {
    useState('carousel').value[item.href] = false;
  });
}

onMounted(() => { 
  //setInterval(next,5000)
})
</script>