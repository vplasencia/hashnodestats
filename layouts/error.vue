<template>
  <div>
    <div class="d-flex justify-center items-center justify-items-center">
      <div v-if="error.statusCode === 404">
        <ErrorPage404 />
      </div>
      <div v-else>
        <ErrorPageDefault />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error",
};
</script>