<script setup>
definePageMeta({
  redirect: (to) => {
    const { _: path, ...query } = to.query;
    return { path, query, replace: true };
  },
});
</script>
