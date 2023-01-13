<template>
  <div class="col">
    <NuxtLink class="card" :href="`/cikkek/${category}/${slug}`">
      <img :src="imageUrl" class="card-img-top" />
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
    category: String,
    imageUrl: String,
    slug: String,
    teaser: String,
    title: String,
  },
}
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

img {
  height: 15rem;
  object-fit: cover;
}

.card-title {
  height: 5rem;
  overflow: hidden;
}

.card-text {
  height: 15rem;
  overflow: hidden;
}
</style>
