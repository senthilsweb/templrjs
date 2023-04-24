<template>
  <section v-if="isSignUpFormVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-xl">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-2xl">
            <div class="flex-1 h-0 overflow-y-auto">
              <header class="space-y-1 py-6 px-4 bg-gradient-to-r from-primary-900 via-sy-700 to-primary-900 sm:px-6">
                <div class="flex items-center justify-between space-x-3">
                  <h2 class="text-lg leading-7 font-medium text-white">New Registration</h2>
                  <div class="h-7 flex items-center">
                    <button v-on:click="isSignUpFormVisible = false" aria-label="Close panel" class="text-primary-200 hover:text-white transition ease-in-out duration-150">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <p class="text-sm leading-5 text-white">The information that you have provided in this registration form will be stored securly as per GDPR requirements and will be used to notify you about temple events i.e. Festivals, Pooja related details etc.</p>
                </div>
              </header>
              <div class="flex-1 flex flex-col justify-between">
                <div class="px-4 divide-y divide-gray-200 sm:px-6">
                  <div class="space-y-6 pb-6">
                    <form name="SignUp" id="SignUp" class="space-y-8" method="POST" @submit.prevent="SignUp">
                      <input type="hidden" name="form-name" value="SignUp" />
                      <div class="sm:overflow-hidden">
                        <section aria-labelledby="Personal-Information">
                          <div class="sm:col-span-6">
                            <h2 class="text-xl font-medium text-gray-900">Personal Information</h2>
                          </div>
                          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div class="sm:col-span-6">
                              <label for="full_name_english" class="block text-sm font-medium text-gray-700">Full name with initials</label>
                              <div class="mt-1">
                                <input type="text" id="full_name_english" name="full_name_english" v-model="data.full_name_english" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist
                                v-on:change="handleSelectedInMemberSalutation_in_tamil"
                                v-model="data.salutation_in_tamil"
                                show_label="true"
                                name="salutation_in_tamil"
                                label="Salutation | அடைமொழி"
                                :data="{
                                  data: [
                                    { code: 'திரு', name: 'திரு' },
                                    { code: 'திருமதி', name: 'திருமதி' },
                                    { code: 'ஸ்ரீமதி', name: 'ஸ்ரீமதி' },
                                    { code: 'குமாரர்', name: 'குமாரர்' },
                                    { code: 'குமாரத்தி', name: 'குமாரத்தி' },
                                  ],
                                }"
                                :selected_value="data.salutation_in_tamil"
                              />
                            </div>
                            <div class="sm:col-span-6">
                              <label for="full_name_tamil " class="block text-medium font-medium text-gray-700">முழு பெயர்</label>
                              <div class="mt-1">
                                <input type="text" id="full_name_tamil" name="full_name_tamil" v-model="data.full_name_tamil" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: usePropertiesStore().properties_by_parent_code('zodiac-star-code') }" v-on:change="handleSelectedInStar" show_label="true" v-model="data.star" name="star" label="Star" :selected_value="data.star" />
                            </div>
                          </div>
                        </section>
                        <section aria-labelledby="Poosai-Information" class="mt-10">
                          <div class="sm:col-span-6">
                            <h2 class="text-xl font-medium text-gray-900">Poosai Information</h2>
                            <!--<p class="mt-1 text-sm text-blue-gray-500">This information will be kept private and never be shared with others for marketing purposes.</p>-->
                          </div>
                          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div class="sm:col-span-6">
                              <div class="mt-1">
                                <Dropdownlist v-on:change="handleSelectedInMemberPoosai_month" v-model="data.poosai_month" name="poosai_month" label="Month" show_label="true" :data="months" :selected_value="data.poosai_month" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <div class="mt-1">
                                <Dropdownlist v-on:change="handleSelectedInMemberPoosai_date" v-model="data.poosai_date" name="poosai_date" label="Day" show_label="true" :data="days" :selected_value="data.poosai_date" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist
                                v-on:change="handleSelectedInMemberPoosai_time"
                                v-model="data.poosai_time"
                                name="kattalai"
                                label="Time"
                                show_label="true"
                                :data="{
                                  data: [
                                    { code: 'Arthajamam', name: 'Arthajamam' },
                                    { code: 'Uchikkalam', name: 'Uchikkalam' },
                                  ],
                                }"
                                :selected_value="data.poosai_time"
                              />
                            </div>
                          </div>
                        </section>
                        <section aria-labelledby="Contact-Information" class="mt-10">
                          <div class="sm:col-span-6">
                            <h2 class="text-xl font-medium text-gray-900">Contact Information</h2>
                          </div>
                          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div class="sm:col-span-6">
                              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                              <div class="mt-1">
                                <input type="text" id="email" name="email" v-model="data.email" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="cell_phone_number" class="block text-sm font-medium text-gray-700">Cell #.</label>
                              <div class="mt-1">
                                <input type="text" id="cell_phone_number" name="cell_phone_number" v-model="data.cell_phone_number" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="whatsapp_number" class="block text-sm font-medium text-gray-700">WhatsApp Phone #.</label>
                              <div class="mt-1">
                                <input type="text" id="whatsapp_number" name="whatsapp_number" v-model="data.whatsapp_number" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="Address-Information" class="mt-10">
                          <div class="sm:col-span-6">
                            <h2 class="text-xl font-medium text-gray-900">Address Information</h2>
                            <!--<p class="mt-1 text-sm text-blue-gray-500">This information will be kept private and never be shared with others for marketing purposes.</p>-->
                          </div>

                          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div class="sm:col-span-6">
                              <label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
                              <div class="mt-1">
                                <input type="text" id="apartment" name="apartment" v-model="data.address.apartment" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="street" class="block text-sm font-medium text-gray-700">Street</label>
                              <div class="mt-1">
                                <input type="text" id="street" name="street" v-model="data.address.street" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                              <div class="mt-1">
                                <input type="text" id="city" name="city" v-model="data.address.city" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="district_county" class="block text-sm font-medium text-gray-700">District</label>
                              <div class="mt-1">
                                <input type="text" id="district_county" name="state" v-model="data.address.district_county" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <Dropdownlist :data="{ data: useCountryStore().list_all('') }" v-on:change="handleSelectedInSignUpForm_country" show_label="true" v-model="data.address.country" name="country" label="Country" :selected_value="data.address.country" />
                            </div>
                            <div class="sm:col-span-6">
                              <label for="state" class="block text-sm font-medium text-gray-700">State / Province</label>
                              <div class="mt-1">
                                <input type="text" id="state" name="state" v-model="data.address.state" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>
                            <div class="sm:col-span-6">
                              <label for="postal_code" class="block text-sm font-medium text-gray-700">Postal code</label>
                              <div class="mt-1">
                                <input type="text" id="postal_code" name="postal_code" v-model="data.address.postal_code" class="py-3 px-4 block w-full pl-5 focus:ring-primary-500 focus:border-primary-500 border-gray-300" />
                              </div>
                            </div>

                            <input type="hidden" name="country_name" id="country_name" v-model="data.address.country_name" />
                          </div>
                        </section>
                        <!-- Checkboxes (Start)-->
                        <div class="pt-2 space-y-4 sm:pt-2 sm:space-y-4 sm:col-span-6">
                          <section aria-labelledby="Consent-Information" class="mt-10">
                            <div class="sm:col-span-6">
                              <h2 class="text-xl font-medium text-gray-900">User Consent</h2>
                            </div>
                            <div class="mt-6">
                              <div class="space-y-6 sm:space-y-5">
                                <div class="pt-6 sm:pt-2">
                                  <div role="group" aria-labelledby="label-email">
                                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                      <div class="mt-4 sm:mt-0 sm:col-span-6">
                                        <div class="max-w-lg space-y-4 ml-2">
                                          <div class="relative flex items-start">
                                            <div class="flex items-center h-5">
                                              <input id="poosai_consent_data_privacy" name="poosai_consent_data_privacy" v-model="data.poosai_consent_data_privacy" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                                            </div>
                                            <div class="ml-3 text-sm">
                                              <label for="poosai_consent_data_privacy" class="text-sm text-gray-700">I hereby agree to receive pooja related details thru SMS and/or WhatsApp</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="sm:col-span-6">
                                  <div class="flex items-center ml-2 pb-2">
                                    <input id="terms_and_conditions" name="terms_and_conditions" type="checkbox" v-model="data.terms_and_conditions" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                                    <label for="terms_and_conditions" class="ml-2 block text-sm leading-5 text-gray-900">
                                      I agree to
                                      <a href="/legal/tc" target="_blank" @click="useNuxtApp().$bus.$emit('evtZynomiTermsAndConditions')" class="font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline transition ease-in-out duration-150"> terms & conditions. </a>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                        <!-- Checkboxes (End)-->
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
              <span class="inline-flex rounded-md shadow-sm">
                <button type="reset" class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Reset</button>
              </span>
              <span class="inline-flex rounded-md shadow-sm">
                <button v-on:click="SignUp" type="submit" class="zyn-button">Save</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
import { useCountryStore } from '~/stores/country';
import { usePropertiesStore } from '~/stores/properties';
//-----------------------------------------------------------------------------------------------------
//2. Page or component properties
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//2. Page or component properties
//-----------------------------------------------------------------------------------------------------
const props = defineProps({
  form_title: {
    type: String,
    required: true,
  },
  form_description: {
    type: String,
    required: true,
  },
});

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------
const isSignUpFormVisible = ref(false);
const progress = ref(false);
const data = ref({ address: { street: '', apartment: '', city: '', postal_code: '', state: '', district_county: '' }, date_of_birth: new Date() });

function initDefaults() {
  data.value = {
    address: { street: '', apartment: '', city: '', postal_code: '', state: '', district_county: '' },
    date_of_birth: new Date(),
  };
}
//-----------------------------------------------------------------------------------------------------
//3. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------
const months = {
  data: useNuxtApp()
    .$dayjs()
    .localeData()
    .months()
    .map(function (mon, idx) {
      return { code: (idx + 1).toString(), name: mon };
    }),
};
//TODO: Find a better for-each loop to create days array
let daysArr = [];
for (let i = 1; i <= 31; i++) {
  daysArr.push({ code: i.toString(), name: i.toString() });
}
const days = { data: daysArr };
//-----------------------------------------------------------------------------------------------------
//4. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
useNuxtApp().$bus.$on('evtSignUpForm', (data) => {
  isSignUpFormVisible.value = !isSignUpFormVisible.value;
  progress.value = false;
});

//-----------------------------------------------------------------------------------------------------
//5. Page level events handlers
//-----------------------------------------------------------------------------------------------------
function handleSelectedInStar(e) {
  data.value.star = e.target.value;
}
function handleSelectedInMemberPoosai_time(e) {
  data.value.poosai_time = e.target.value;
}
function handleSelectedInMemberSalutation_in_tamil(e) {
  data.value.salutation_in_tamil = e.target.value;
}
function handleSelectedInMemberPoosai_month(e) {
  data.value.poosai_month = e.target.value;
}
function handleSelectedInMemberPoosai_date(e) {
  data.value.poosai_date = e.target.value;
}
function handleSelectedInSignUpForm_country(e) {
  data.value.address.country = e.target.value;
  data.value.address.country_name = e.target.options[e.target.selectedIndex].text;
}
//-----------------------------------------------------------------------------------------------------
//6. Page level action methods
//-----------------------------------------------------------------------------------------------------
async function SignUp(args) {
  progress.value = true;
  console.log("isEmpty =",isEmpty(data.value.full_name_english));
  try {
    //data.value.date_of_birth = useNuxtApp().$dayjs(data.value.date_of_birth).format('DD-MMM-YYYY');
    data.value.additional_attributes = {};
    data.value.tenant = 'vairavankoil';

    console.log("modelValidate=",modelValidate(data.value))
    if (modelValidate(data.value)) {
      await useFetch('/api/supabase/registration/create', {
        method: 'post',
        body: data.value,
        initialCache: false,
        onResponse({ request, response, options }) {
          if (response._data) {
            if (!response._data.code) {
              useNuxtApp().$toast.show({
                type: 'success',
                message: 'Thank you for your signing up, one of our associte will contact you soon!.',
                timeout: 6,
              });
              initDefaults();
              isSignUpFormVisible.value = !isSignUpFormVisible.value;
              
            } else {
              useNuxtApp().$toast.show({
                type: 'danger',
                message: 'Failure during Sign Up.',
                timeout: 6,
              });
            }
          }
          progress.value = false;
        },
      });
    } else {
      
      console.log("Please fill all the required fields.")
      useNuxtApp().$toast.show({
        type: 'danger',
        message: 'Please fill all the required fields.',
        timeout: 6,
      });
    }
  } catch (error) {
    isSignUpFormVisible.value = !isSignUpFormVisible.value;
    useNuxtApp().$toast.show({
      type: 'error',
      message: 'Failure during Sign Up.',
      timeout: 6,
    });
  } finally {
    progress.value = false;
  }
}
//-----------------------------------------------------------------------------------------------------
//7. Form validations
//-----------------------------------------------------------------------------------------------------`
// Required field validations for all fields marked as required" in this page
function modelValidate(args) {
  let isValid=ref(false);
  
 isValid = 
    !isEmpty(args.full_name_english)
    && !isEmpty(args.star)
    && !isEmpty(args.poosai_month)
    && !isEmpty(args.poosai_date)
    && !isEmpty(args.poosai_time)
    && !isEmpty(args.email)
    && !isEmpty(args.cell_phone_number)
    && !isEmpty(args.whatsapp_number)
    //&& data.value.address.apartment && data.value.address.city && data.value.address.postal_code && data.value.address.state && data.value.address.district_county && data.value.address.country

  return isValid;
}
</script>
