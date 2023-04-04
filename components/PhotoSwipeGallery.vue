<!-- Adapted from: https://photoswipe.com/vue-image-gallery -->
<script setup>
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { onMounted, ref } from 'vue'

import 'photoswipe/style.css'

import { cmsURL } from '~/utils/constants.ts'

const props = defineProps({
  galleryID: String,
  images: Array,
})

const lightbox = ref()

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    })
    lightbox.value.init()
  }
})

onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy()
    lightbox.value = null
  }
})
</script>

<template>
  <div :id="galleryID">
    <a
      v-for="(image, key) in images"
      :key="key"
      :href="cmsURL + image.attributes.url"
      :data-pswp-width="image.attributes.width"
      :data-pswp-height="image.attributes.height"
      target="_blank"
    >
      <img
        class="img-thumbnail m-1"
        :src="cmsURL + image.attributes.formats.thumbnail.url"
        :alt="image.attributes.alternativeText"
      />
    </a>
  </div>
</template>
