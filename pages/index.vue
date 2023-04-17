<script setup>
import { cmsURL, titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Kezdőlap - ${titlePostfix}` })

const { find } = useStrapi()

const homepage = (await find('homepage')).data.attributes

const articles = await find('articles', {
  filters: { current: true },
  populate: '*',
  sort: 'date:desc',
})
</script>

<template>
  <div class="mb-3">
    <h1>Kezdőlap</h1>

    <MarkdownContent :source="homepage.content" />
    <div class="container">
      <h2>Aktuális / Kiemelt cikkek</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <ArticleCard
          v-for="article in articles.data"
          :category="article.attributes.category.data.attributes"
          :title="article.attributes.title"
          :imageUrl="
            cmsURL +
            (article.attributes.cover?.data?.attributes?.formats?.small?.url ??
              article.attributes.cover?.data?.attributes?.url)
          "
          :teaser="article.attributes.teaser"
          :slug="article.attributes.slug"
        />
      </div>
    </div>
  </div>
</template>
