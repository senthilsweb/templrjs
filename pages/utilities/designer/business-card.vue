<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
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
              <BusinessCardForm />
              <!-- Secondary sidebar (End)-->
              <div class="flex-1 xl:overflow-y-auto">
                <DesignerPageHeader showbutton="true" guide="Management screen to keep Client(s) up-to-date" addClickEvent="evtUpsertClient" />
                <div class="w-full">
                  <!-- Main content (start)-->

                  <div class="m-10 grid">
                    <button v-if="showBusinessCardPlaceholder" type="button" class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <Icon name="icon-park-twotone:color-card" class="h-12 w-12 text-gray-400" />
                      <span class="mt-2 block text-sm font-medium text-gray-900">Business Card</span>
                    </button>
                    <div v-if="!showBusinessCardPlaceholder" class="grid grid-cols-1 lg:gap-8 rounded-lg border-2 border-dashed border-gray-300">
                      <img :src="businessCard" class="lg:col-span-2 lg:row-span-2 rounded-lg" />
                    </div>
                  </div>

                  <!-- Main content (End)-->
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<!--Server and client side javascript-->
<script setup>
import BusinessCardForm from '@/pages/utilities/designer/BusinessCardForm.vue';
import DesignerPageHeader from '@/pages/utilities/designer/DesignerPageHeader.vue';

const businessCard = ref({});
const url = ref('');
const showBusinessCardPlaceholder = ref(true);
useNuxtApp().$bus.$on('evtBusinessCardRender', (data) => {
  showBusinessCardPlaceholder.value = false;
  const image_url_parts = [`https://res.cloudinary.com`, `nathansweb`, `image`, 'upload'].join('/');
  const name = `g_south_west,x_${data.name_x},y_${data.name_y},l_text:Arial_45_bold:${data.name}`;
  const designation = `g_south_west,x_${data.designation_x},y_${data.designation_y},l_text:Arial_28_bold:${data.designation}`;
  const email = `g_south_west,x_${data.email_x},y_${data.email_y},co_rgb:ffffff,l_text:open%20sans_18:${data.email}`;
  const mobile = `g_south_west,x_${data.mobile_x},y_${data.mobile_y},co_rgb:ffffff,l_text:open%20sans_18:${data.mobile}`;
  const version = `v1672149788`;
  const publicid = `zense.zynomi.com/zynomi-business-card-with_punch_line.png`;
  businessCard.value = [image_url_parts, name, designation, email, mobile, data.cloudinary_image_version, data.cloudinary_image_public_id].join('/');
});
</script>
