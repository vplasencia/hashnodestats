<template>
  <nav>
    <div>
      <NuxtLink to="/">
        <div class="logo">
          <!-- <div>Hashnode</div>
          <div>Stats</div> -->
          <!-- <p>Hashnode Stats</p> -->
          <img src="/logo.svg" alt="Hashnode Stats Logo" width="140">
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
  @apply flex justify-between items-center py-3 pl-3 pr-3 w-full;
}

.logo {
  @apply text-center font-bold text-lg text-purple-600;
}
</style>