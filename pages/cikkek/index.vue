<template>
  <div>
    <h2>Összes</h2>
    <ul>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <ArticleCard
          v-for="article in articles.data"
          :category="article.attributes.category.data.attributes.slug"
          :title="article.attributes.title"
          :imageUrl="`https://cms.brke.banti.hu${article.attributes.cover?.data?.attributes?.formats?.thumbnail?.url}`"
          :teaser="article.attributes.teaser"
          :slug="article.attributes.slug"
        />
      </div>
    </ul>
    <nav aria-label="Lapozás">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <a class="page-link" :href="`?oldal=${page - 1}`" aria-label="Előző">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="pageItem in pageItems_v2"
          class="page-item"
          :class="{ active: pageItem.active }"
        >
          <a class="page-link" :href="`?oldal=${pageItem.target}`">{{
            pageItem.target
          }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: page === articles.meta.pagination.pageCount }"
        >
          <a
            class="page-link"
            :href="`?oldal=${page + 1}`"
            aria-label="Következő"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
//import type { Article } from '~/types'
const route = useRoute();
const page = route.query.oldal ? Number(route.query.oldal) : 1;
const { find } = useStrapi();
const categories = await find("categories");
const articles = await find("articles", {
  populate: "*",
  pagination: { pageSize: 4, page },
});

const pageItems_v1 = [-2, -1, 0, 1, 2]
  .map((offset) => ({
    target: page + offset,
    active: offset === 0,
  }))
  .filter(
    ({ target }) => 1 <= target && target <= articles.meta.pagination.pageCount
  );

const pageItems_v2 = Array.from(
  { length: articles.meta.pagination.pageCount },
  (_, i) => ({ target: i + 1, active: page === i + 1 })
)
  .sort((a, b) => Math.abs(a.target - page) - Math.abs(b.target - page))
  .slice(0, 5)
  .sort((a, b) => a.target - b.target);
</script>

<style scoped>
.pagination {
  user-select: none;
}
</style>
