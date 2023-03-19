<script setup>
import { titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Cikkek - ${titlePostfix}` })
</script>

<template>
  <div>
    <!-- <h1>Cikkek</h1> -->
    <NuxtPage />
  </div>
</template>
