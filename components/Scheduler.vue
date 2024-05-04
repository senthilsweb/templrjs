<template>
  <div class="sm:col-span-6 space-y-6 gap-y-6">
   <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Schedules & Triggers</h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">Select date and time to run the jobs or input CRON pattern.</p>
                              </div>
    <!-- Schedule (Start)-->
    <div class="sm:col-span-6">
      <label for="name" class="block text-sm font-medium text-gray-700"> When </label>
      <div class="mt-1 rounded-md shadow-sm">
        <VueCtkDateTimePicker color="#50E3C2" button-color="#50E3C2" v-model="data.when" auto-close="true" class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300" />
      </div>
    </div>
    <div class="sm:col-span-3">
      <Dropdownlist
        v-model="data.hour"
        @selected_item="handleSelectedInStatus"
        name="is_enabled"
        label="Hour"
        :data="{
          data: [
            { code: '1', name: '1' },
            { code: '2', name: '2' },
          ],
        }"
        :selected_value="data.hour"
      />
    </div>

    <div class="sm:col-span-3">
      <Dropdownlist
        v-model="data.minute"
        name="is_enabled"
        label="Minute"
        :data="{
          data: [
            { code: '0', name: '0' },
            { code: '15', name: '15' },
            { code: '30', name: '30' },
            { code: '45', name: '55' },
          ],
        }"
        :selected_value="data.minute"
      />
    </div>
    <div class="sm:col-span-6">
      <Dropdownlist
        v-model="data.timezone"
        name="is_enabled"
        label="Time Zone"
        :data="{
          data: [
            { code: '(GMT-3:00) Santiago', name: '(GMT-3:00) Santiago' },
            { code: '(GMT-5:00) Eastern Time (US and Canada)', name: '(GMT-5:00) Eastern Time (US and Canada)' },
            { code: '(GMT+5:30) Mumbai, Kolkata, New Delhi', name: '(GMT+5:30) Mumbai, Kolkata, New Delhi' },
            { code: '(GMT+0:00) London', name: '(GMT+0:00) London' },
          ],
        }"
        :selected_value="data.timezone"
      />
    </div>

    <!-- Schedule (End)-->
  </div>
</template>

<script>
import Dropdownlist from '@/components/Dropdownlist.vue';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
export default {
  components: {
    Dropdownlist,
    VueCtkDateTimePicker,
  },
    data() {
    return {
      isUpsertBotVisible: false,
      data: {
       
      },
    };
  },
  methods: {},
};
</script>
