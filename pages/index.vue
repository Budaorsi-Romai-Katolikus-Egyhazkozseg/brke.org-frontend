<script setup>
import { cmsURL, titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Kezdőlap - ${titlePostfix}` })

const { find } = useStrapi()

const homepage = ref(undefined)
const articles = ref(undefined)

try {
  // Fetch homepage markdown content
  find('homepage').then((result) => {
    homepage.value = result.data
  })

  // Fetch current articles
  find('articles', {
    filters: { current: true },
    populate: '*',
    sort: 'date:desc',
  }).then((result) => {
    articles.value = result.data
  })
} catch (error) {
  console.error(error)
}
</script>

<template>
  <div class="mb-3 d-flex flex-column gap-2">
    <h1>Kezdőlap</h1>

    <MarkdownContent v-if="homepage" :source="homepage.attributes.content" />
    <div v-else class="container placeholder-glow">
      <span class="placeholder col-7"></span>
      <br />
      <span class="placeholder col-4"></span>
    </div>

    <EventList />
    <div class="container">
      <h2>Aktuális és kiemelt cikkek</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <ArticleCard
          v-if="articles"
          v-for="article in articles"
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
        <div v-else class="col">
          <div class="card placeholder-glow">
            <div
              class="card-img-top placeholder"
              :style="{ height: '15rem', background: 'gray' }"
            />
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
