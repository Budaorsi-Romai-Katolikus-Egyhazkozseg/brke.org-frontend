<template>
  <div>
    <h2>{{ article.title }}</h2>
    <p v-html="article.content" />
  </div>
</template>

<script setup lang="ts">
//import type { Article } from '~/types'
const route = useRoute();
const { find } = useStrapi();
const response = await find("articles", {
  filters: { slug: route.params.article },
});
const article = response.data[0].attributes;
</script>
