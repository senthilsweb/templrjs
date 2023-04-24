<template>
  <div class="z-10 h-screen flex overflow-hidden bg-gray-50">
    <!-- Static sidebar for desktop -->
    <div class="z-10 before:hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="z-10 flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
          <ManagementLeftNavBar />
          <!--{{$route.name.split('-')[$route.name.split('-').length-1]}}-->
          <ManagementSoftwareVersion />
        </div>
      </div>
    </div>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 flex overflow-hidden">
          <div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
            <div class="flex-1 flex xl:overflow-hidden">
              <!-- Secondary sidebar (Start)-->
              <!-- Secondary sidebar (End)-->
              <div class="flex-1 xl:overflow-y-auto">
                <div class="w-full">
                  <!-- 'Center content (start)-->
                  <h1 class="text-3xl ml-6 font-bold tracking-tight text-primary-gray-900 pt-4">Data Signals</h1>
                  <div class="flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                    <div class="hidden sm:flex sm:space-x-6 pt-8">
                      <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->

                      <a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-900">Sensors</a>
                      <a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700">Clients</a>
                      <a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700">Invoices</a>
                      <a href="#" class="inline-flex items-center px-1 text-xl font-bold text-gray-500 hover:border-gray-300 hover:text-gray-700">Payments</a>
                      <VueCtkDateTimePicker button="Select date range" id="dt_rng_picker" type="button" button-color="#eab308" no-button="false" label="Select date range" no-label="true" v-model="input.date_range" right="true" range="true" color="#eab308" onlyDate="true" no-clear-button="true" format="YYYY-MM-DD" formatted="L" auto-close="false"> </VueCtkDateTimePicker>
                    </div>
                  </div>
                  <div class="flex flex-row gap-6 m-6">
                    <div class="basis-1/4 bg-white rounded-lg shadow m-2">
                      <div class="m-2">
                        <BarChart />
                      </div>
                    </div>
                    <div class="basis-3/4 bg-white rounded-lg shadow m-2">
                      <div class="m-2">
                        <ComboChart />
                      </div>
                    </div>
                  </div>

                  <dashboard-stats api_end_point="/_stats/dashboard-stats" class="rounded-lg shadow ml-8 mr-8" />

                  <!-- 'Center content (End)-->
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import stats from '@/store/stats-bot-analytics.json';
import lefNavLinks from '@/store/admin-navigation.json';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
export default {
  components: {
    DatePicker,
    VueCtkDateTimePicker,
  },
  data() {
    const date = ref(new Date());
    date.value.setDate(Number(new Date().getDate()) + 35);
    return {
      range: {
        start: new Date(),
        end: date.value,
      },
      input: { date_range: { start: new Date(), end: date.value } },
      stats,
      lefNavLinks,
    };
  },
  methods: {},
  async asyncData({ params }) {},
  created() {},
  mounted() {
    document.getElementById('dt_rng_picker-input').className = 'bg-yellow-500 w-[14rem] text-white text-md font-bold rounded focus:ring-yellow-600 focus:border-yellow-600 block min-w-0  border-yellow-600';
  },
};
</script>
<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});
</script>
