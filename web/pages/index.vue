
import InstagramPosts from 'components/InstagramPosts.vue';

<template>
  <NuxtLayout name="landing">
    <div>
    <!--<Carousel/>-->
    <BlogRecent />
    <TemplrJSHero api_end_point="/configs/hero"/>
    <InstagramPosts/>
    <Marquee api_end_point="/configs/tech-stack" />
    </div>
  </NuxtLayout>
</template>
