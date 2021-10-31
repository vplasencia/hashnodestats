<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 px-2">
      <div class="flex items-center justify-center">
        <span class="text-purple-600 font-medium text-3xl"
          >Analyze your Hashnode Stats</span
        >
      </div>
      <div class="my-5 flex items-center justify-center">
        <NuxtLink
          to="/hashnode"
          class="
            rounded-lg
            border-2 border-purple-600
            text-purple-600
            py-3
            px-5
            hover:bg-purple-600
            transition-colors
            hover:text-white
            font-semibold
          "
          >Demo</NuxtLink
        >
      </div>
    </div>
    <form
      class="px-2 grid grid-cols-1 place-items-center my-5"
      @submit.prevent="analyzeUser()"
      novalidate
    >
      <div>
        <label for="userName">Hashnode Username</label>
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="hashnode"
          autocomplete="off"
          value=""
          class="
            mt-2
            h-12
            px-3
            w-full
            border-2
            rounded-lg
            focus:outline-none
            input-default
          "
          autofocus
        />
        <div id="error-message" class="error-text opacity-0">
          Invalid Hashnode Username (put the Username without @)
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            id="user-btn"
            class="
              flex
              justify-center
              items-center
              mt-2
              rounded-lg
              border-2 border-purple-600
              py-4
              px-5
              bg-purple-600
              transition-colors
              text-white
              font-semibold
              hover:bg-purple-700
            "
          >
            <div v-show="checkingUser" class="mr-3">
              <BtnLoader />
            </div>
            <span>Analyze User</span>
          </button>
        </div>
      </div>
    </form>
    <!-- <p>numFollowing: {{ user.numFollowing }}</p>
    <p>numFollowers: {{ user.numFollowers }}</p> -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
      <div class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow">
        <div class="chart" id="chart"></div>
      </div>
      <div class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow">
        <div class="chart" id="chart1"></div>
      </div>
    </div> -->
    <!-- <Charts v-if="analyze" :userName="userName" /> -->

    <div class="flex justify-center items-center my-10 px-2">
      <div
        class="
          list-disc
          rounded-lg
          bg-gray-100
          py-5
          px-5
          md:px-20
          space-y-5
          shadow
          w-full
          md:w-6/12
        "
      >
        <span
          class="
            flex
            justify-center
            items-center
            text-3xl text-purple-600
            font-medium
            mb-3
          "
          >FAQs</span
        >
        <div>
          <div class="title-faqs">&bull; What is Hashnode?</div>
          <div>
            Hashnode is a free blogging platform built for developers by developers. Blog on
            personal domain, share ideas, and connect with the global dev
            community!
          </div>
        </div>
        <div>
          <div class="title-faqs">&bull; How is the data obtained?</div>
          <div>
            <span
              >The data is obtained from the public
              <a
                href="https://api.hashnode.com/"
                target="_blank"
                rel="noreferrer noopener nofollow"
                class="text-purple-700 hover:underline hover:text-purple-800"
                >Hashnode api</a
              >.</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="px-2 my-10">
      <div>
        <div
          class="
            flex
            justify-center
            items-center
            text-3xl text-purple-600
            font-medium
            mb-3
          "
        >
          <span>Contact</span>
        </div>
        <div class="flex justify-center items-center mt-5">
          Contact me if you have any questions, concerns, suggestions or want to
          add new statistics.
        </div>
        <ContactForm />
        <div class="text-center">
          <span
            >Or send me an email to
            <a
              href="mailto:hello@vivianplasencia.com"
              target="_blank"
              rel="noreferrer noopener nofollow"
              class="text-purple-700 hover:text-purple-800 hover:underline"
              >hello@vivianplasencia.com</a
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      userName: null,
      checkingUser: false,
    };
  },
  mounted() {
    this.checkingUser = false;
    let inputUsername = document.getElementById("userName");
    inputUsername.addEventListener("focus", (e) => {
      if (inputUsername.classList.contains("input-error")) {
        inputUsername.classList.remove("input-error");
        inputUsername.classList.add("input-default");
        document.getElementById("error-message").classList.add("opacity-0");
      }
    });
  },
  methods: {
    async analyzeUser() {
      let userName = document.getElementById("userName").value;
      this.userName = userName;
      if (userName === "" || userName === undefined) return;
      this.checkingUser = true;
      document.getElementById("user-btn").disabled = true;
      document.getElementById("user-btn").classList.add("cursor-not-allowed");

      let query = gql`
        query userInfo($userName: String!) {
          user(username: $userName) {
            username
          }
        }
      `;
      let variables = { userName: userName };
      let response = await this.$apollo.query({ query, variables });

      // console.log("user", response.data.user.username);

      if (response.data.user.username !== null) {
        this.checkingUser = false;
        document.getElementById("user-btn").disabled = false;
        document
          .getElementById("user-btn")
          .classList.remove("cursor-not-allowed");
        this.$router.push(userName);
      } else {
        document.getElementById("error-message").classList.remove("opacity-0");
        document.getElementById("userName").classList.remove("input-default");
        document.getElementById("userName").classList.add("input-error");
        this.checkingUser = false;
        document.getElementById("user-btn").disabled = false;
        document
          .getElementById("user-btn")
          .classList.remove("cursor-not-allowed");
      }
    },
  },
};
</script>

<style scoped>
.chart {
  min-height: unset !important;
}

.chart-wrapper {
  height: 30em;
}

.error-text {
  @apply text-red-500 text-sm mt-1;
}

.input-default {
  @apply border-purple-400 focus:border-purple-600;
}

.input-error {
  @apply border-red-500;
}

.title-faqs {
  @apply font-medium text-lg mb-1;
}
</style>