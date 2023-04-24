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

              <!-- Secondary sidebar (End)-->
              <div class="flex-1 xl:overflow-y-auto">
                <InquiriesPageHeader showbutton="true" heading="" guide="Management screen to keep Inquiries(s) up-to-date" addClickEvent="evtUpsertInquiries" />
                <InquiriesSearch heading="Search Filter" />
                <div class="w-full">
                  <!-- Main content (start)-->
                  <div class="grid">
                    <InquiriesGrid />
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

<!--Server and Inquiries side javascript-->
<script setup>
import InquiriesPageHeader from '@/pages/inquiries/InquiriesPageHeader.vue';
import InquiriesSearch from '@/pages/inquiries/InquiriesSearch.vue';
import InquiriesGrid from '@/pages/inquiries/InquiriesGrid.vue';

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});
</script>
