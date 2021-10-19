<template>
  <div class="flex items-center justify-center my-10 py-5">
    <form action="" class="space-y-5" @submit.prevent="sendEmail()" novalidate>
      <div class="space-y-2">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          class="
            h-12
            px-3
            w-full
            border-purple-400 border-2
            rounded-lg
            focus:outline-none
            focus:border-purple-600
          "
        />
      </div>
      <div class="space-y-2">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class="
            h-12
            px-3
            w-full
            border-purple-400 border-2
            rounded-lg
            focus:outline-none
            focus:border-purple-600
          "
        />
      </div>
      <div class="space-y-2">
        <label for="message">Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          class="
            h-40
            p-3
            w-full
            border-purple-400 border-2
            rounded-lg
            focus:outline-none
            focus:border-purple-600
          "
        ></textarea>
      </div>
      <div class="space-y-2 flex items-center justify-center">
        <button type="submit" class="send-btn">
          <span>Send</span>
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
            class="feather feather-send"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.send-btn {
  @apply rounded-lg
          border-2 border-purple-600
          py-3
          px-5
        bg-purple-600
          transition-colors
        text-white
          flex
          space-x-2
          font-semibold
          hover:bg-transparent
          hover:text-purple-600;
}
</style>