<template>
  <NuxtLayout name="landing">
    <div v-if="showHeader" class="border-b mt-4 border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h2 class="text-2xl font-semibold text-slate-600 pl-4 sm:pl-0">Resume</h2>
      <div class="mt-3 flex sm:ml-4 sm:mt-0 hidden sm:flex">
        <button type="button" @click="generatePDF" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Download</button>
      </div>
    </div>
    <div class="p-4" id="resume" name="resume">
      <div class="relative mt-0 flex items-center gap-x-4">
        <img v-if="data.basics.picture" :src="data.basics.picture" :alt="data.basics.name" class="h-28 w-28 flex-none rounded-lg bg-gray-800 object-cover" />
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
              <Icon :name="profile.icon" class="h-6 w-6 text-center" />
            </a>
          </div>
        </div>
      </div>
      <!-- Resume content goes here -->

      <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{{ data.basics.summary }}</p>
      <!-- Professional Synopsis -->
      <h2 class="text-2xl font-semibold text-gray-600 mt-4">Professional Synopsis</h2>
      <ul class="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
        <li v-for="item in data.professionalSynopsis" :key="item" v-html="item"></li>
      </ul>
      <!-- Core Competencies -->
      <h2 class="text-2xl font-semibold text-gray-600 mt-4">Core Competencies</h2>
      <div class="mt-2 grid grid-cols-2 gap-x-2 md:grid-cols-4 md:gap-y-0">
        <div v-for="item in data.coreCompetencies" :key="item" class="group relative">
          <h3 class="mt-1 text-md font-semibold text-zinc-400 dark:text-zinc-400">
            <a href="#">
              <span class="absolute inset-0" />
              {{ item }}
            </a>
          </h3>
        </div>
      </div>

      <!-- Technical Competencies -->
      <h2 class="text-2xl font-semibold text-gray-600 mt-4">Technical Competencies</h2>
      <div class="mt-2 grid grid-cols-2 gap-x-2 md:grid-cols-4 md:gap-y-0">
        <div v-for="item in data.technicalCompetencies" :key="item" class="group relative">
          <h3 class="mt-1 text-sm font-semibold text-zinc-400 dark:text-zinc-400">
            <a href="#" class="flex items-center">
              <Icon :name="item.icon" :alt="item.name" class="h-8 w-8 pr-2" />
              {{ item.name }}
            </a>
          </h3>
        </div>
      </div>

      <!-- Certifications Section -->
      <h2 class="text-2xl font-semibold text-gray-600 mt-4">Certifications</h2>
      <ul class="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
        <li v-for="item in data.certifications" :key="item">{{ item.name }}</li>
      </ul>
      <!-- Notable Accomplishments -->
      <div v-if="data.notableAccomplishments" class="mt-4">
        <h2 class="text-2xl font-semibold text-gray-600 mt-4">Notable Accomplishments</h2>
        <ul class="list-disc text-sm text-zinc-600 dark:text-zinc-400 pl-6 mt-2">
          <li v-for="item in data.notableAccomplishments" :key="item">{{ item }}</li>
        </ul>
      </div>
      <!-- Work Experience -->
      <div class="mt-4">
        <h2 class="text-2xl font-semibold text-gray-600 mt-4">Work Experience</h2>
        <div v-for="job in data.work" :key="job.company" class="mt-4 pb-2">
          <h3 class="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">{{ job.company }} - {{ job.position }}</h3>
          <p class="font-semibold tracking-tight text-zinc-400 dark:text-zinc-100">{{ job.location }}</p>
          <p class="text-xs mt-1 tracking-tight text-zinc-400 dark:text-zinc-100"><Icon name="icon-park-twotone:calendar-dot" class="w-4 h-4 inline-block mr-1" /> {{ job.startDate }} - {{ job.endDate }}</p>
          <p class="mt-2 tracking-tight text-sm text-zinc-600 dark:text-zinc-400">{{ job.summary }}</p>
        </div>
      </div>
      <!-- Volunteering Experience -->
      <div v-if="data.volunteer" class="mt-4">
        <h2 class="text-2xl font-semibold text-gray-600 mt-4">Volunteering</h2>
        <div v-for="job in data.volunteer" :key="job.organization" class="mt-4 pb-2">
          <h3 class="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">{{ job.organization }} - {{ job.position }}</h3>
          <p class="font-semibold tracking-tight text-zinc-400 dark:text-zinc-100">{{ job.location }}</p>
          <p class="text-xs mt-1 tracking-tight text-zinc-400 dark:text-zinc-100"><Icon name="icon-park-twotone:calendar-dot" class="w-4 h-4 inline-block mr-1" /> {{ job.startDate }} - {{ job.endDate }}</p>
          <p class="mt-2 tracking-tight text-sm text-zinc-600 dark:text-zinc-400">{{ job.summary }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import dayjs from 'dayjs';

definePageMeta({});

const { path } = useRoute();
console.log('resume path=', path);
const showHeader = ref(true);

const params = new URLSearchParams(window.location.search);
showHeader.value = params.get('print') === 'true' ? false : true;

const name = params.get('name'); // returns 'John'
console.log('name=', name);

const { data } = await useFetch(`/configs/${name}.json`, {
  method: 'get',
});

const generatePDF = async () => {
  const resumeElement = document.querySelector('#resume');

  // Generate canvas from the content inside the 'resume' div with adjusted scale
  const canvas = await html2canvas(resumeElement, {
    scale: 1, // Adjust this value for optimal balance between size and quality
    useCORS: true,
    allowTaint: true,
    windowWidth: resumeElement.scrollWidth,
    windowHeight: resumeElement.scrollHeight,
  });

  // Convert canvas to a compressed JPEG image
  const imgData = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality value between 0 (worst) to 1 (best)

  const pdf = new jsPDF('p', 'mm', 'a4', { compression: true });

  // Margins for the PDF (in mm)
  const topMargin = 10;
  const leftMargin = 10;
  const rightMargin = 10;
  const bottomMargin = 10;

  const pdfWidth = pdf.internal.pageSize.getWidth() - leftMargin - rightMargin;
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // Split the image into multiple parts to fit into pages
  let heightLeft = pdfHeight;
  let position = 0; // Start from the top of the image

  let pageNumber = 1;

  while (heightLeft >= 0) {
    // Add the image slice for the current page
    pdf.addImage(imgData, 'JPEG', leftMargin, topMargin - position, pdfWidth, pdfHeight);

    // Add page number at the bottom right corner
    pdf.setFontSize(11);
    pdf.text(`Page ${pageNumber}`, pdf.internal.pageSize.getWidth() - rightMargin - 10, pdf.internal.pageSize.getHeight() - bottomMargin, { align: 'right' });

    heightLeft -= pdf.internal.pageSize.getHeight() - topMargin - bottomMargin;
    position += pdf.internal.pageSize.getHeight() - topMargin - bottomMargin;

    // If there's still content left, add a new page
    if (heightLeft >= 0) {
      pdf.addPage();
      pageNumber++;
    }
  }

  pdf.save(`${name}_${dayjs().unix()}.pdf`);
};
</script>
