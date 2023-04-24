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
                <CommonsSecondaryNav title="IoT/Things" api_end_point="/_navigation/things" />
                <!-- Secondary sidebar (End)-->
                <div class="flex-1 xl:overflow-y-auto">
                  <div class="w-full">
                    <!-- Main content (start)-->
  
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


  //-----------------------------------------------------------------------------------------------------
  //1. Page level imports
  //-----------------------------------------------------------------------------------------------------
  //Get server side master data for departments
  definePageMeta({
    layout: 'admin',
    middleware: ['auth'],
  });
  
  //-----------------------------------------------------------------------------------------------------
  //2. Variable declaration and initialization
  //-----------------------------------------------------------------------------------------------------
  
  const progress = ref(false);
  const data = ref({});
  
  //-----------------------------------------------------------------------------------------------------
  //3. Data initialization and server side rendering
  //-----------------------------------------------------------------------------------------------------
  
  //-----------------------------------------------------------------------------------------------------
  //4. Event Subscriptions
  //-----------------------------------------------------------------------------------------------------
  useNuxtApp().$bus.$on('evtUploadSuccess', (data) => {
    

  });
  
  useNuxtApp().$bus.$on('evtCompanyFormSubmit', (data) => {
    
  });
  //
  
  //-----------------------------------------------------------------------------------------------------
  //5. Page level events handlers
  //-----------------------------------------------------------------------------------------------------
  
  //-----------------------------------------------------------------------------------------------------
  //6. Page level action methods
  //-----------------------------------------------------------------------------------------------------
  
  </script>
  