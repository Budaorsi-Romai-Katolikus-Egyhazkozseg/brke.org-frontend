<template>
  <NuxtLayout>
    <h1>Hiba ({{ error.statusCode }})</h1>
    <p>A keresett oldal betöltése közben hiba történt.</p>
    <NuxtLink to="/">
      <button type="button" class="btn btn-primary">Vissza a főoldalra</button>
    </NuxtLink>
  </NuxtLayout>
</template>

<script>
export default { props: { error: Object } }
</script>
