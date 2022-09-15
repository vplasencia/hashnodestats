<template>
  <footer class="py-5 bg-gray-100 px-2">
    <div>
      <div class="pt-3 pb-5 flex justify-center items-center space-x-5">
        <div class="flex mx-2">
          <a
            href="https://github.com/vplasencia/hashnodestats"
            target="_blank"
            rel="noreferrer noopener nofollow"
            class="p-3 flex gap-2 hover:bg-gray-200 rounded-lg text-purple-500 transition-colors duration-100 ease-linear"
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
              class="feather feather-github"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path></svg
            >View Code on Github</a
          >
        </div>
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