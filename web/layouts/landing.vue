<script setup>
const route = useRoute()
const showHeader = ref(true)

onMounted(() => {
  if (route.query.print) {
    showHeader.value = false
  }
})
</script>
<template>
  <div class="max-w-7xl mx-auto bg-white">
    <!--<Header v-if="showHeader"/>-->
    <HeaderSpotLight v-if="showHeader" class="pt-6 pl-2 pr-2 sm:pl-0 sm:pr-0"/>
    <div class="mx-auto">
      <div class="min-h-screen relative">
        <div class="h-full relative" :class="!showHeader ? 'mt-0' : 'mt-16'">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <Footer v-if="showHeader"/>
  <CommonsSideBarGuide form_title="Online Help" form_description="Handy SQL queries to practice against the sample Tickit database" />
</template>
