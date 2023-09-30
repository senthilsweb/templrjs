<script setup></script>
<template>
  <div class="max-w-7xl mx-auto bg-white">
    <Header/>
    <div class="mx-auto">
      <div class="min-h-screen relative">
        <div class="h-full relative">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  <CommonsSideBarGuide form_title="Online Help" form_description="Handy SQL queries to practice against the sample Tickit database" />
</template>
