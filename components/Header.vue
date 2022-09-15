<template>
  <nav class="flex justify-between items-center">
    <NuxtLink to="/">
      <div class="logo">
        <img src="/logo.svg" alt="Hashnode Stats Logo" width="140" />
      </div>
    </NuxtLink>
    <NuxtLink to="/about">
      <div class="aboutLink">About</div>
    </NuxtLink>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  @apply flex justify-between items-center py-5 px-5 md:px-10 w-full;
}

.logo {
  @apply text-center font-bold text-lg text-purple-600;
}

.aboutLink {
  @apply rounded-lg text-lg text-purple-600 py-3 px-5 hover:bg-gray-100 transition-colors font-semibold duration-100 ease-linear;
}
</style>