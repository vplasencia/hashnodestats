<template>
  <div id="btn-preloader" class="center"></div>
</template>

<script>
export default {};
</script>

<style scoped>
#btn-preloader {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-top: 2px solid white;
  border-right: 2px solid transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.center {
  /* top: 0; */
  top: 45%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* position: fixed; */
  /* position: relative; */
}
</style>