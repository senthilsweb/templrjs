<template>
  <NuxtLayout name="landing">
    <div class="p-4">
      <div class="relative mt-8 flex items-center gap-x-4">
        <img src="https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg" :alt="data.basics.name" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
        <div class="text-sm leading-6">
          <p class="font-semibold text-2xl text-zinc-800 dark:text-zinc-100">
            <a href="#">
              <span class="absolute inset-0" />
              {{ data.basics.name }}
            </a>
          </p>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ data.basics.email }}</p>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ data.basics.phone }}</p>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ data.basics.location.full_address }}</p>
          <!-- Loop through social profiles -->
          <!-- Wrap the social profiles in a flex container -->
          <div class="my-3 space-x-3">
            <a v-for="profile in data.basics.profiles" :key="profile.network" :href="profile.url" target="_blank" class="p-2 rounded-md bg-gray-100 hover:bg-gray-400" :aria-label="profile.network">
              <Icon :name="profile.icon" class="h-4 w-4 text-center" />
            </a>
          </div>
        </div>
      </div>
      <!-- Resume content goes here -->

      <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{{ data.basics.summary }}</p>
      <!-- Professional Synopsis -->
      <h2 class="text-xl font-semibold mt-4">Professional Synopsis</h2>
      <ul class="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
        <li v-for="item in data.professionalSynopsis" :key="item">{{ item }}</li>
      </ul>
      <!-- Core Competencies -->
      <h2 class="text-xl font-semibold mt-4">Core Competencies</h2>
      <div class="mt-2 grid grid-cols-2 gap-x-2 md:grid-cols-4 md:gap-y-0">
        <div v-for="item in data.coreCompetencies" :key="item" class="group relative">
          <h3 class="mt-4 text-md font-semibold text-zinc-400 dark:text-zinc-400">
            <a href="#">
              <span class="absolute inset-0" />
              {{ item }}
            </a>
          </h3>
        </div>
      </div>

      <!-- Technical Competencies -->
      <h2 class="text-xl font-semibold mt-4">Technical Competencies</h2>
      <div class="mt-2 grid grid-cols-2 gap-x-2 md:grid-cols-4 md:gap-y-0">
        <div v-for="item in data.technicalCompetencies" :key="item" class="group relative">
          <h3 class="mt-4 text-sm font-semibold text-zinc-400 dark:text-zinc-400">
            <a href="#">
              <Icon :name="item.icon" :alt="item.name" class="h-6 w-6 pr-2" />
              {{ item.name }}
            </a>
          </h3>
        </div>
      </div>
      <!-- Certifications Section -->
      <h2 class="text-xl font-semibold mt-4">Certifications</h2>
      <ul class="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
        <li v-for="item in data.certifications" :key="item">{{ item }}</li>
      </ul>
      <!-- Notable Accomplishments -->
      <h2 class="text-xl font-semibold mt-4">Notable Accomplishments</h2>
      <ul class="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
        <li v-for="item in data.notableAccomplishments" :key="item">{{ item }}</li>
      </ul>
      <div class="mt-4">
        <!-- Work Experience -->
        <h2 class="text-xl font-semibold mt-4">Work Experience</h2>
        <div v-for="job in data.work" :key="job.company" class="mt-4 pb-2">
          <h3 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">{{ job.position }}</h3>
          <p class="font-semibold tracking-tight text-zinc-400 dark:text-zinc-100">{{ job.company }} - {{ job.location }}</p>
          <p class="text-xs tracking-tight text-zinc-400 dark:text-zinc-100"><Icon name="icon-park-twotone:calendar-dot" class="w-4 h-4 inline-block mr-1" /> {{ $dayjs(job.startDate).format('DD-MMM-YYYY') }} - {{ $dayjs(job.endDate).format('DD-MMM-YYYY') }}</p>
          <p class="mt-2 tracking-tight text-sm text-zinc-600 dark:text-zinc-400">{{ job.summary }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
definePageMeta({});
const { path } = useRoute();
console.log('resume path=', path);

const params = new URLSearchParams(window.location.search);

const name = params.get('name'); // returns 'John'
console.log('name=', name);

const {data} = await useFetch(`/configs/${name}.json`, {
  method: 'get',
});
</script>
