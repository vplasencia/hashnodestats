<template>
  <div>
    <div class="relative container flex justify-center items-center">
      <button
        id="share"
        class="
          cursor-pointer
          h-14
          rounded-full
          w-14
          hover:bg-purple-700
          bg-purple-600
          flex
          items-center
          justify-center
          focus:outline-none
        "
        @click="shareClick()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-share-2 text-white"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
      <div id="share-icons" class="absolute hidden">
        <a
          class="
            absolute
            flex
            items-center
            justify-center
            h-8
            w-8
            rounded-full
            bg-purple-600
            hover:bg-purple-700
            text-white
            -top-14
            right-8
            cursor-pointer
          "
          :href="
            'https://twitter.com/intent/tweet/?text=' +
            $route.params.userName +
            '%20Hashnode%20Stats&url=https://hashnodestats.netlify.app/' +
            $route.params.userName
          "
          title="Share Twitter"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitter h-4"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            ></path>
          </svg>
        </a>
        <span
          class="
            absolute
            flex
            items-center
            justify-center
            h-8
            w-8
            rounded-full
            bg-purple-600
            hover:bg-purple-700
            text-white
            -top-4
            right-12
            cursor-pointer
          "
          :href="
            'https://www.linkedin.com/sharing/share-offsite/?url=https://hashnodestats.netlify.app/' +
            $route.params.userName
          "
          title="Share LinkedIn"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-linkedin h-4"
          >
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            ></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </span>
        <button
          class="
            absolute
            flex
            items-center
            justify-center
            h-8
            w-8
            rounded-full
            bg-purple-600
            hover:bg-purple-700
            text-white
            top-6
            right-8
            cursor-pointer
          "
          title="Copy Link"
          @click="copyLinkToClipboard()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-link h-4"
          >
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            ></path>
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    shareClick() {
      let shareIcons = document.getElementById("share-icons");
      shareIcons.classList.toggle("hidden");
    },
    copyLinkToClipboard() {
      var linkUrl = window.location.href;

      let inputElem = document.createElement("input");
      inputElem.type = "text";
      inputElem.value = linkUrl;

      document.querySelector("body").appendChild(inputElem);

      inputElem.select();
      document.execCommand("copy");
      inputElem.remove();
    },
  },
};
</script>

<style>
</style>