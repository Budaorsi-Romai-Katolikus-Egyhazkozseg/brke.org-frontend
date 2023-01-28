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
