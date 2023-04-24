<template>
  <div class="h-screen flex overflow-hidden bg-gray-50">
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
          <ManagementLeftNavBar />
          <ManagementSoftwareVersion />
        </div>
      </div>
    </div>
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 flex overflow-hidden">
          <div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
            <nav aria-label="Breadcrumb" class="bg-white border-b border-blue-gray-200 xl:hidden">
              <div class="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
                <a href="#" class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
                  <!-- Heroicon name: solid/chevron-left -->
                  <svg class="h-5 w-5 text-blue-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span>Profiles information</span>
                </a>
              </div>
            </nav>
            <div class="flex-1 flex xl:overflow-hidden">
              <!-- Secondary sidebar (Start)-->
              <CommonsSecondaryNav title="Profiless" api_end_point="/_navigation/things" />

              <!-- Secondary sidebar (End)-->

              <div class="flex-1 xl:overflow-y-auto">
                <ProfilesPageHeader heading="Profiles" showbutton="true" guide="Management screen to keep Profiles(s) up-to-date" searchClickEvent="evtSearchProfiles" addClickEvent="evtUserSignup" />
                <ProfilesSearch heading="Filter Profiles" />
                <div class="w-full">
                  <!-- Main content (start)-->
                  <!-- Profiles Body content (start)-->
                  <div class="space-y-8 divide-y divide-gray sm:space-y-5 pt-5">
                    <div>
                      <ProfilesGrid />
                    </div>
                  </div>
                  <!-- Profiles Body content (End)-->
                  <!-- Main content (End)-->
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <ProfilesUpsert />
    <UserSignup />
  </div>
</template>
<!--Server side javascript-->
<script setup>
//-----------------------------------------------------------------------------------------------------
//1. Page level imports
//-----------------------------------------------------------------------------------------------------
import ProfilesPageHeader from '@/pages/profiles/ProfilesPageHeader.vue';
import ProfilesSearch from '@/pages/profiles/ProfilesSearch.vue';
import ProfilesGrid from '@/pages/profiles/ProfilesGrid.vue';
import ProfilesUpsert from '@/pages/profiles/ProfilesUpsert.vue';
import UserSignup from '@/pages/profiles/UserSignup.vue';

//-----------------------------------------------------------------------------------------------------
//1.a Page Metadata 
//-----------------------------------------------------------------------------------------------------
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

//-----------------------------------------------------------------------------------------------------
//2. Variable declaration and initialization
//-----------------------------------------------------------------------------------------------------

// Nil

//-----------------------------------------------------------------------------------------------------
//3. Page or component properties
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//4. Data initialization and server side rendering
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//5. Event Subscriptions
//-----------------------------------------------------------------------------------------------------
//Subscribe to upsert panel visiblity and get the selected value from the backend

//Nil


//-----------------------------------------------------------------------------------------------------
//6. Page level events handlers
//-----------------------------------------------------------------------------------------------------

//NIL

//-----------------------------------------------------------------------------------------------------
//7. Page level action methods
//-----------------------------------------------------------------------------------------------------

//Nil

//-----------------------------------------------------------------------------------------------------
//8. Form validations
//-----------------------------------------------------------------------------------------------------`

// Required field validations for all fields listed in this page
async function validate() {

}

</script>
