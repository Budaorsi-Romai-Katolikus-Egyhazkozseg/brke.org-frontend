<script setup>
import { titlePostfix } from '~/utils/constants.ts'

useHead({ title: `Közvetítés - ${titlePostfix}` })
</script>

<template>
  <div>
    <!-- <h1>Közvetítés</h1> -->
    <div class="ratio ratio-16x9">
      <!-- <div class="placeholder"></div> -->
      <img src="~/assets/stream-thumbnail.png" />
      <iframe
        src="https://www.youtube.com/embed/live_stream?channel=UClZucNJxRAwF26bf6kCWtsQ"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style>
@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

iframe {
  opacity: 0;
  animation: 1s fadein 0.5s forwards;
}
</style>
