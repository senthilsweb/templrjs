<template>
  <NuxtLayout name="landing">
    <div class="p-4">
        <div class="relative mt-8 flex items-center gap-x-4">
        <img src="https://res.cloudinary.com/nathansweb/image/upload/v1626488903/profile/Senthil-profile-picture-01_al07i5.jpg" :alt="data.basics.name" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
       
        <div class="text-sm leading-6">
                <p class="font-semibold text-2xl text-zinc-800 dark:text-zinc-100 ">
                  <a href="#">
                    <span class="absolute inset-0" />
                    {{ data.basics.name }}
                  </a>
                </p>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ data.basics.email }}</p>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ data.basics.phone }}</p>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ data.basics.location.full_address }}</p>
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
          <h3 class="mt-4 text-zinc-600 dark:text-zinc-400">
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
          <h3 class="mt-4 text-zinc-600 dark:text-zinc-400">
            <a href="#">
              <Icon :name="item.icon" :alt="item.name" class="h-6 w-6 pr-2" />
              {{ item.name }}
            </a>
          </h3>
        </div>
      </div>
      <!-- Certifications Section -->
      <h2 class="text-xl font-semibold mt-4">Certifications</h2>
      <ul class="list-disc pl-6 mt-2">
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
        <div v-for="job in data.work" :key="job.company" class="mt-2">
          <h3 class="text-lg font-semibold">{{ job.position }}</h3>
          <p class="text-gray-600">{{ job.company }} - {{ job.location }}</p>
          <p class="text-gray-600">{{ $dayjs(job.startDate).format('DD-MMM-YYYY') }} - {{ $dayjs(job.endDate).format('DD-MMM-YYYY') }}</p>
          <p class="mt-2">{{ job.summary }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
definePageMeta({});
const { path } = useRoute();
console.log('resume path=', path);
//console.log('useRoute().query.print', useRoute().query.print);
const { data } = await useAsyncData(`content`, () => {
  return queryContent().where({ _path: '/resume/senthilnathan' }).findOne();
});
</script>
