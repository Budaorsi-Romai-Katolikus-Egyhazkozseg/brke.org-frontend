<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  source: String,
})

const container = ref(null)

onMounted(() => {
  container.value.querySelectorAll('a').forEach((a) => {
    if (a.attributes.href.value.startsWith('/')) {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        router.push({ path: a.attributes.href.value })
      })
    }
  })
})
</script>

<template>
  <div ref="container" v-html="md.render(source)" />
</template>
