<template>
  <div class="col">
    <NuxtLink class="card" :href="`/cikkek/${category.slug}/${slug}`">
      <img :src="imageUrl" class="card-img-top" />
      <div class="card-category">{{ category.name }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ teaser }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
    imageUrl: String,
    slug: String,
    teaser: String,
    title: String,
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/main.scss';

a.card {
  max-width: 333px;
  margin: auto;

  color: inherit;
  text-decoration: none;
}

img {
  height: 15rem;
  object-fit: cover;
}

.card-category {
  position: absolute;
  right: 0;
  top: 14rem;

  width: 6rem;
  padding: 0.2rem 0.8rem;

  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;

  background-color: var(--bs-primary);

  border-bottom-left-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}

.card-title {
  height: 5rem;
  overflow: hidden;
}

.card-text {
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
}

@include media-breakpoint-up(md) {
  .card-text {
    height: 15rem;
  }
}
</style>
