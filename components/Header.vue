<template>
  <nav>
    <div>
      <NuxtLink to="/">
        <div class="logo">
          <div>Hashnode</div>
          <div>Stats</div>
          <!-- <p>Hashnode Stats</p> -->
        </div>
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  /* @apply flex justify-between items-center py-2 pl-3 pr-3 fixed w-full bg-white shadow-md z-50; */
  @apply flex justify-between items-center py-2 pl-3 pr-3 w-full mt-3 ml-3;
}

.logo {
  @apply text-center font-bold text-lg text-purple-600;
}
</style>