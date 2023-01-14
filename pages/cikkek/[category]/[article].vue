<script setup lang="ts">
import { cmsURL } from '~/utils/constants.ts'
import { md } from '~/utils/markdown.ts'

const route = useRoute()
const { find } = useStrapi()

const response = await find('articles', {
  filters: { slug: route.params.article },
  populate: '*',
})

const article = response.data[0].attributes
</script>

<template>
  <div>
    <div class="header d-grid container mb-4">
      <div :style="{ gridArea: 'title' }">
        <h2>{{ article.title }}</h2>
      </div>
      <div class="p-4" :style="{ gridArea: 'teaser' }">
        <p class="text-muted">{{ article.date }}</p>
        <p class="fw-bold">{{ article.teaser }}</p>
      </div>
      <div :style="{ gridArea: 'image' }">
        <img
          class="w-100 rounded-4"
          :src="cmsURL + article.cover?.data?.attributes?.url"
        />
      </div>
    </div>
    <div class="container" v-html="md.render(article.content)" />
  </div>
</template>

<style lang="scss">
@import '~/assets/scss/main.scss';

.header {
  grid-template-areas:
    'title'
    'teaser'
    'image';
}

@include media-breakpoint-up(md) {
  .header {
    grid-template-areas:
      'title  title'
      'teaser image';
  }
}

@include media-breakpoint-up(lg) {
  .header {
    grid-template-areas:
      'title  image'
      'teaser image';
  }
}
</style>
