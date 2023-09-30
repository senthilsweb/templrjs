<template>
  <div
    id="carouselExampleCaptions"
    class="relative"
    data-te-carousel-init
    data-te-ride="carousel"
  >
    <!-- Carousel indicators -->
    <div
      class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
      data-te-carousel-indicators
    >
      <button
        v-for="(item, index) in navigation"
        :key="index"
        type="button"
        @click="currentSlide(index)"
        data-te-target="#carouselExampleCaptions"
        :data-te-slide-to="index"
        :data-te-carousel-active="index === 0"
        class="mx-[3px] box-content h-[3px] w-[30px] z-50 flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
        :aria-current="index === 0"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>

    <!-- Carousel items -->
    <div class="relative w-full overflow-hidden after:clear-both after:block after:content-[''] px-4 sm:px-0">
      <div
        v-for="(item, idx) in navigation"
        :key="idx"
        :class="['relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none', {'hidden': c_idx !== idx}]"
        data-te-carousel-item
        style="backface-visibility: hidden"
      >
        <img :src="item.href" class="block w-full" :alt="'Slide ' + (idx + 1)" />
        <div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
          <h5 class="text-xl">{{ item.name }}</h5>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
<!--Carousel controls - prev item-->
<button
    class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    @click="prev()"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="prev">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Previous</span
    >
  </button>
  <!--Carousel controls - next item-->
  <button
    class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    @click="next()"
    data-te-target="#carouselExampleCaptions"
    data-te-slide="next">
    <span class="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </span>
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Next</span
    >
  </button>
   
  </div>
</template>
<script setup>

/* 
* This carousel is based on Tailwind Elements Carousel
* https://tailwind-elements.com/docs/standard/components/carousel/
*/
const c_idx = ref(0);
const c_total = ref(0);
const active_idx = ref(0);
const links = await useFetch(`/configs/carousel.json`, {
  method: 'get',
});
const navigation = ref(links.data._rawValue.menu);
console.log("navigation = ", JSON.stringify(navigation.value))
c_total.value = navigation.value.length;
const carousel = useState('carousel', () => ref({}));
navigation.value.forEach((item, idx) => {
  useState('carousel').value[item.href] = idx == 0;
});

function prev(item) {
    reset();
   //alert(c_idx.value)
  if (c_idx.value - 1 >= 0) c_idx.value = c_idx.value - 1;
  useState('carousel').value[navigation.value.data[c_idx.value].href] = true;
  
}
function next(item) {
  reset();
  if (c_idx.value + 1 < c_total.value) c_idx.value = c_idx.value + 1;
  useState('carousel').value[navigation.value.data[c_idx.value].href] = true;
}
function reset() {
  navigation.value.forEach((item, idx) => {
    useState('carousel').value[item.href] = false;
  });
}
// Auto-play function
function currentSlide(idx) {
c_idx.value = idx-1;
next();
}

// Auto-play interval in milliseconds
const autoPlayInterval = 10000; // Adjust the interval as needed

// Auto-play function
function autoPlay() {
setInterval(() => {
  if (c_idx.value + 1 < c_total.value) c_idx.value = c_idx.value + 1;
  else c_idx.value = 0;
  next();
}, autoPlayInterval);
}
// Start auto-play
autoPlay();
</script>