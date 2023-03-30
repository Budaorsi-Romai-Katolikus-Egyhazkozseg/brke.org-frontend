<template>
  <dt class="col-md-6 col-lg-4 col-xl-4 col-xxl-3">{{ title }}:</dt>
  <dd class="col-md-6 col-lg-8 col-xl-8 col-xxl-9">
    <slot />
  </dd>
</template>

<script>
export default {
  props: {
    title: String,
  },
}
</script>

<style>
dd {
  transition: background-color 0.5s;
}

dt:hover + dd {
  background-color: lightgray;
}
</style>
