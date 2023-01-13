<script setup>
import { cmsURL, titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Kezdőlap - ${titlePostfix}` })

const { find } = useStrapi()

const articles = await find('articles', {
  filters: { current: true },
  populate: '*',
})
</script>

<template>
  <div>
    <h1>Kezdőlap</h1>

    A honlap átalakítás alatt áll, kérjük a látogatók szíves türelmét a teljes
    funkcionalitás visszaállításáig!

    <h2>Miserend</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Hétfő - Csütörtök</th>
          <th scope="col">Péntek - Szombat</th>
          <th scope="col">Vasárnap</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td>7:30</td>
        </tr>
        <tr>
          <td>8:00</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>9:00</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>10:30</td>
        </tr>
        <tr>
          <td></td>
          <td>18:00</td>
          <td>18:00</td>
        </tr>
      </tbody>
    </table>
    <h2>Aktuális / Kiemelt cikkek</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      <ArticleCard
        v-for="article in articles.data"
        :category="article.attributes.category.data.attributes.slug"
        :title="article.attributes.title"
        :imageUrl="
          cmsURL +
          article.attributes.cover?.data?.attributes?.formats?.thumbnail?.url
        "
        :teaser="article.attributes.teaser"
        :slug="article.attributes.slug"
      />
    </div>
  </div>
</template>
