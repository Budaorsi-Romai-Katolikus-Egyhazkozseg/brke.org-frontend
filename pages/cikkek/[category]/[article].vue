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
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2">
        <div class="col">
          <h2>{{ article.title }}</h2>
          <p class="text-muted">{{ article.submitted }}</p>
          <p class="fw-bold">{{ article.teaser }}</p>
        </div>
        <div class="col">
          <img
            class="w-100 rounded-4"
            :src="cmsURL + article.cover?.data?.attributes?.url"
          />
        </div>
      </div>
    </div>
    <div v-html="md.render(article.content)" />
  </div>
</template>
