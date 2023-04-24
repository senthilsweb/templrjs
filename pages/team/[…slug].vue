<template>
    <NuxtLayout name="landing">
  <div class="h-screen flex overflow-hidden">
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1 bg-white">
          <div class="px-4 py-16">
            <div class="mx-auto w-full fixed max-w-sm">
              <RadioGroup v-model="selected">
                <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
                <div class="space-y-2">
                  <RadioGroupOption as="template" v-for="plan in plans" :key="plan.name" :value="plan" v-slot="{ active, checked }">
                    <div @click="hop(plan.href)" :class="[active ? 'ring-2 ring-primary-800 ring-opacity-60 ring-offset-2 ring-offset-sky-300' : '', checked ? 'bg-primary-900 bg-opacity-75 text-white ' : 'bg-primary-200 ']" class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="text-sm">
                            <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-gray-900'" class="font-medium">
                              {{ plan.name }}
                            </RadioGroupLabel>
                            <RadioGroupDescription as="span" :class="checked ? 'text-sky-100' : 'text-gray-500'" class="inline">
                              <span> {{ plan.title }}</span>
                            </RadioGroupDescription>
                          </div>
                        </div>
                        <!--<div v-show="checked" class="shrink-0 text-primary-800">
                              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                                <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>-->
                      </div>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 flex overflow-hidden">
          <div class="flex-1 overflow-y-auto">
            <div class="w-full p-2">
              <!-- Main content (start)-->
              <section id="author" aria-labelledby="author-title" class="relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16">
                <div class="relative mx-auto max-w-5xl pt-16 sm:px-6">
                  <div class="bg-primary-50 pt-px sm:rounded-6xl">
                    <div class="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
                      <img class="absolute inset-0 h-full w-full object-cover" :src="instructor.instructor_picture" alt="" sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem" />
                    </div>
                    <div class="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
                      <h2 class="inline-flex items-center rounded-full py-1 px-4 text-primary-600 ring-1 ring-inset ring-primary-600">
                        <span class="font-mono text-sm" aria-hidden="true"> {{ instructor.instructor_id }} </span>
                        <span class="ml-3 h-3.5 w-px bg-primary-600/20" />
                        <span class="ml-3 text-base font-medium tracking-tight">
                          {{ instructor.instructor_designation }}
                        </span>
                      </h2>

                      <p class="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        <span class="block text-primary-600">{{ instructor.instructor_full_name }} –</span>
                        {{ instructor.instructor_punch_title }}
                      </p>
                      <p v-for="instructor in instructor.instructor_content_paragraphs" class="mt-8 text-md tracking-tight text-gray-500">
                        {{ instructor }}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Main content (End)-->
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue';

const plans = [
  {
    name: 'Tamara Tirják',
    title: 'Odissi Instructor',
    href: '/team/tamara',
  },
  {
    name: 'Santoshi Iyer',
    title: 'Carnatic Music Instructor',
    href: '/team/santoshi',
  },
  {
    name: 'Sangeetha Subramanian',
    title: 'Artistic Director and Bollywood Dance Instructor',
    href: '/team/sangeetha',
  },
  {
    name: 'Bhargavi Anand',
    title: 'Bharatanatyam Instructor',
    href: '/team/bhargavi',
  },
];

const selected = ref(plans[0]);
const { path } = useRoute();

let selected_idx = useFindIndex(plans, function (o) {
  return o.href == path;
});
selected.value = plans[selected_idx];

const { data: instructor } = await useAsyncData(`content-${path}`, () => {
  return queryContent()
    .where({ _path: `/instructors/${path.split('/').pop()}` })
    .findOne();
});

/*const instructor = ref({});
instructor.value = {
  instructor_full_name: 'Sangeetha Subramanian',
  instructor_display_name: 'sangeetha',
  instructor_picture: 'https://res.cloudinary.com/swaranritya/image/upload/v1664154686/www.swaranritya.com/instructors/SangeethaSubramanian.jpg',
  instructor_punch_title: 'I’m the Artistic Director and Bollywood Dance Instructor.',
  instructor_id: '03',
  instructor_designation: 'Instructor',
  instructor_specialities: [],
  instructor_content_paragraphs: ['Sangeetha has been dancing since the age of 6 and has had a career and passion in dancing for over 10 years. She began to teach dance in 2015 when she first moved to Cambridge, UK. She has performed in various national and International dance events including India, Japan cultural Association in Matsuyama, Japan and the UK. She has also organized and performed in various dance workshops in primary schools, community and public events all around Cambridge. Sangeetha is also a trained Bharatanatyam dancer for over 10 years and gives one-on-one lessons for children and adults.', 'She has performed in the well known Natyanjali festival for 3 consecutive years, including various other temples around Tamil Nadu, India. Sangeetha is very experienced and has performed in over 50 dance stages throughout her learning period. Her passion towards dancing is not only towards Bharatanatyam but various other dance forms like Tollywood, Contemporary and Bollywood.', 'She teaches Bollywood style dance for children between the age of 4 to 15. She has taken her students to many National and International level dance shows. Sangeetha trains her students to not only be able to perform but also to take up challenges by entering dance competitions. Some of her students performed in the Teen Star Talent Competition UK 2019 and became one of the finalists.', 'Sangeetha believes that learning has absolutely no end and continues to train herself new Bollywood dancing skills with the Bollywood Dance School of London.', 'Her motto is “Love what you do and do what you love”'],
};*/

function hop(href) {
  navigateTo(href);
  //alert(args)
}
onMounted(() => {
  console.log('Mounted');
});

onUnmounted(() => {
  console.log('onUnmounted');
});
</script>
