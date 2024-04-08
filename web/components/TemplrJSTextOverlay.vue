<template>
  <div class="image-container">
    <figure class="relative">
      <img class="post-cover rounded-lg" :src="cloudinaryURL" alt="Title goes here" />
    </figure>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
interface CloudinaryImageConfig {
  baseUrl: string;
  publicId: string;
  transformations: {
    width?: number;
    crop?: string;
    textOverlay?: {
      font?: string;
      size?: number;
      weight?: string;
      content?: string;
      gravity?: string;
      xOffset?: number;
      yOffset?: number;
    };
  }[];
}

function generateTransformationString(transformation: CloudinaryImageConfig['transformations'][0]): string {
  const parts = [];

  // Apply default values directly in the string template
  parts.push(`w_${transformation.width || 800}`);
  parts.push(`c_${transformation.crop || 'fit'}`);

  if (transformation.textOverlay) {
    const textOverlay = transformation.textOverlay;
    parts.push(
      `l_text:${textOverlay.font || 'Arial'}_${textOverlay.size || 60}_${textOverlay.weight || 'bold'}:${encodeURIComponent(textOverlay.content || 'Default Text')}`,
      `g_${textOverlay.gravity || 'south'}`,
      `x_${textOverlay.xOffset || 10}`,
      `y_${textOverlay.yOffset || 10}`
    );
  }

  return parts.join(',');
}




// Define the props with typing based on the interface
const props = defineProps<{
  config: CloudinaryImageConfig;
}>();

const cloudinaryURL = computed(() => {
  const config = props.config; // Assuming myConfig is a ref as defined in your client code
  const transformationStrings = config.transformations.map(generateTransformationString).join('/');
  return `${config.baseUrl}/image/upload/${transformationStrings}/${config.publicId}`;
});

</script>

<style scoped>
.image-container img {
  width: 100%;
  height: auto;
}
</style>
