<template>
  <div v-if="loading">
    <div id="preloader" class="center"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
#preloader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-top: 2px solid #8b5cf6;
  border-right: 2px solid transparent;
  animation: spin 1s linear infinite;
  z-index: 20;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.center {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  position: fixed;
}
</style>