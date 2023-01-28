<template>
  {{ name }}
  <i v-if="position"><br />({{ position }})</i>
  <a v-if="email" :href="`mailto:${email}`">[{{ email }}]</a>
  <br />
</template>

<script>
export default {
  props: {
    email: String,
    name: String,
    position: String,
  },
}
</script>
