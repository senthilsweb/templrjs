<script setup lang="ts">
const print = ref(useRoute().query.print || false);
</script>
<template>
   <div class="max-w-8xl mx-auto">
    <Header v-if="!print"/>
  </div>
  <div class="mx-auto">
    <div class="min-h-screen relative">
      <div class="h-full relative">
        <slot />
      </div>
    </div>
  </div>
   <Footer v-if="!print"/>
  <CommonsInquiryForm form_title="Enquiry Form" form_description="" />
  <CommonsSignUpForm form_title="Sign Up Form" form_description="" />
</template>
