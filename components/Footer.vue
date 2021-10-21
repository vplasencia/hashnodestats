<template>
  <footer class="py-5 bg-gray-100 px-2">
    <div>
      <div class="pt-3 pb-5 flex justify-center items-center space-x-5">
        <span>Contacts</span>
        <a
          href="https://twitter.com/ViviPlasenciaC"
          title="Vivian Plasencia's Twitter Profile"
          target="_blank"
          rel="noreferrer noopener nofollow"
          class="p-3 hover:bg-gray-200 rounded-lg text-purple-500"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitter"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            ></path></svg
        ></a>
        <a
          href="mailto:hello@vivianplasencia.com"
          title="Vivian Plasencia's Email Address"
          target="_blank"
          rel="noreferrer noopener nofollow"
          class="p-3 hover:bg-gray-200 rounded-lg text-purple-500"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-mail"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            ></path>
            <polyline points="22,6 12,13 2,6"></polyline></svg
        ></a>
      </div>
      <div
        class="pt-5 border-t-2 border-gray-300 flex items-center justify-center"
      >
        <div class="text-center py-3">
          <span class="flex justify-center items-center space-x-1">
            <span>{{ year }}</span>
            <span>&bull;</span>
            <span>Made with</span>
            <span>❤️</span>
            <span>by</span>
            <a
              class="text-purple-700 hover:underline"
              href="https://twitter.com/ViviPlasenciaC"
              >Vivian Plasencia</a
            >
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
let dayjs = require("dayjs");
export default {
  data() {
    return {
      year: null,
    };
  },
  mounted() {
    this.year = dayjs().year();
  },
};
</script>

<style scoped>
</style>