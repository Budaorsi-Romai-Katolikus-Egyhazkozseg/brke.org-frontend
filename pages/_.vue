<script setup>
import { onBeforeMount } from "vue";

onBeforeMount(() =>
  navigateTo({ path: window.location.hash.slice(1), replace: true })
);
</script>
