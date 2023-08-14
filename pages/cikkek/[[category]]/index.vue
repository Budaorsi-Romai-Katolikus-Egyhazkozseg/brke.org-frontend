<script setup lang="ts">
import { cmsURL } from '~/utils/constants.ts'
import { getPageItems } from '~/utils/pagination.ts'

const route = useRoute()
const { find } = useStrapi()

const page = computed(() => (route.query.oldal ? Number(route.query.oldal) : 1))

const getCategories = async () =>
  await find('categories', {
    populate: '*',
    sort: 'name:asc',
  })
const categories = ref(await getCategories())

const currentCategory = computed(() =>
  categories.value.data.find((c) => c.attributes.slug === route.params.category)
)

const getArticles = async () =>
  await find('articles', {
    ...(currentCategory.value
      ? { filters: { category: currentCategory.value.id } }
      : {}),
    pagination: { pageSize: 8, page: page.value },
    populate: '*',
    sort: 'date:desc',
  })
const articles = ref(await getArticles())

const pageCount = computed(() => articles.value.meta.pagination.pageCount)

const pageItems = computed(() =>
  getPageItems(page.value, pageCount.value, 5).map((i) => ({
    target: i,
    active: page.value === i,
  }))
)

watch(
  () => route.query.oldal,
  async () => {
    articles.value = await getArticles()
  }
)
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center py-2">
      <h2>{{ currentCategory?.attributes?.name || 'Összes' }}</h2>
      <div class="dropdown">
        <button
          type="button"
          :class="[
            'btn',
            'btn-primary',
            'btn-sm',
            'dropdown-toggle',
            'd-flex',
            'justify-content-around',
            'align-items-center',
          ]"
          :style="{ width: '9em' }"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi-filter"></i>
          Szűrés
        </button>
        <ul class="dropdown-menu" :style="{ minWidth: 'unset', width: '8em' }">
          <li>
            <NuxtLink class="dropdown-item" :to="{ params: { category: '' } }">
              Összes
            </NuxtLink>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li v-for="category in categories.data">
            <NuxtLink
              class="dropdown-item"
              :to="{ params: { category: category.attributes.slug } }"
            >
              {{ category.attributes.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="mb-4">
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
    <nav aria-label="Lapozás">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <NuxtLink
            class="page-link"
            active-class="∅"
            :to="`?oldal=${page - 1}`"
            aria-label="Előző"
          >
            <span aria-hidden="true">«</span>
          </NuxtLink>
        </li>
        <li
          v-for="pageItem in pageItems"
          class="page-item"
          :class="{ active: pageItem.active }"
        >
          <NuxtLink
            class="page-link"
            active-class="∅"
            :to="`?oldal=${pageItem.target}`"
          >
            {{ pageItem.target }}
          </NuxtLink>
        </li>
        <li
          class="page-item"
          :class="{ disabled: page === articles.meta.pagination.pageCount }"
        >
          <NuxtLink
            class="page-link"
            active-class="∅"
            :to="`?oldal=${page + 1}`"
            aria-label="Következő"
          >
            <span aria-hidden="true">»</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.pagination {
  user-select: none;
}
</style>
