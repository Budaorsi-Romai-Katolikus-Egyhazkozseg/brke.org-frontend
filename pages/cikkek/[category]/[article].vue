<template>
  <div>
    <h2>{{ article.title }}</h2>
    <div v-html="md.render(article.content)" />
  </div>
</template>

<script setup lang="ts">
//import type { Article } from '~/types'
import { md } from "~/utils/markdown.ts";
const route = useRoute();
const { find } = useStrapi();
const response = await find("articles", {
  filters: { slug: route.params.article },
});
const article = response.data[0].attributes;
</script>
