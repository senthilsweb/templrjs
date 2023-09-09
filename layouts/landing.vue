<script setup></script>
<template>
  <div class="max-w-7xl mx-auto bg-white">
    <Header />
    <div class="mx-auto">
      <div class="min-h-screen relative">
        <div class="h-full relative">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>
