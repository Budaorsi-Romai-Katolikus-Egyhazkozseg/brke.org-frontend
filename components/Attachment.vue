<template>
  <a class="btn btn-primary" :href="url" :download="name" target="_blank">
    <i
      :class="`bi bi-${icon}`"
      :style="{
        fontSize: '1.4rem',
        lineHeight: '1rem',
        verticalAlign: 'top',
        marginLeft: '-5px',
      }"
    ></i>
    {{ caption }}
  </a>
</template>

<script>
export default {
  props: {
    caption: String,
    icon: { type: String, default: 'file-earmark' },
    name: String,
    url: String,
  },
}
</script>
