
import InstagramPosts from 'components/InstagramPosts.vue';

<template>
  <NuxtLayout name="landing">
    <div>
    <Carousel/>
    
    <TemplrJSHero api_end_point="/configs/hero"/>
    <!--<BlogRecent />-->
    <InstagramPosts/>
    <Marquee api_end_point="/configs/tech-stack" />
    </div>
  </NuxtLayout>
</template>
