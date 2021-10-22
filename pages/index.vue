<template>
  <div>
    <div class="my-5 flex place-content-center">
      <NuxtLink
        to="/vivianplasencia"
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
          placeholder="vivianplasencia"
          autocomplete="off"
          value=""
          class="
            mt-2
            h-12
            px-3
            w-full
            border-purple-400 border-2
            rounded-lg
            focus:outline-none
            focus:border-purple-600
          "
        />
        <div class="flex justify-center">
          <button
            type="submit"
            class="
              justify-center
              mt-5
              rounded-lg
              border-2 border-purple-600
              py-3
              px-5
              bg-purple-600
              transition-colors
              text-white
              font-semibold
              hover:bg-purple-700
            "
          >
            Analyze User
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

    <div class="px-2">
      <ContactForm />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      userName: null,
    };
  },
  methods: {
    async analyzeUser() {
      let userName = document.getElementById("userName").value;
      this.userName = userName;

      let query = gql`
        query userInfo($userName: String!) {
          user(username: $userName) {
            username
          }
        }
      `;
      let variables = { userName: userName };
      let response = await this.$apollo.query({ query, variables });

      console.log("user", response);

      if (response.data.user.username !== null) {
        this.$router.push(userName);
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
</style>