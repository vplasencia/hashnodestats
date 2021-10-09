<template>
  <div>
    <div class="px-2 w-full mb-10">
      <div class="text-base md:text-lg border rounded-lg shadow-md p-5">
        <ChartPreloader v-if="!posts" />
        <div
          v-if="posts"
          class="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            place-items-center
            md:place-items-start
            gap-5
          "
        >
          <div>
            <span class="font-semibold">Following:</span>
            <span>
              {{ user.numFollowing }}
            </span>
          </div>
          <div>
            <span class="font-semibold">Followers:</span>
            <span>
              {{ user.numFollowers }}
            </span>
          </div>
          <div>
            <span class="font-semibold">Date Joined:</span>
            <span>
              {{ user.dateJoined }}
            </span>
          </div>
          <div>
            <span class="font-semibold">Posts:</span>
            <span>
              {{ posts.length }}
            </span>
          </div>
          <div>
            <span class="font-semibold">Reactions:</span>
            <span v-if="user.numReactions">
              {{ user.numReactions }}
            </span>
            <span v-else> 0 </span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
      <div
        class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow-md"
      >
        <ChartPreloader v-if="!hola" />
        <!-- <RadarChart v-if="hola" :radarChartObj="{ idString: 1 }" /> -->
        <div class="chart" v-show="hola" id="postsPerWeekDay"></div>
      </div>
      <div
        class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow-md"
      >
        <ChartPreloader v-if="!hola1" />
        <!-- <RadarChart v-if="hola1" :radarChartObj="{ idString: 2 }" /> -->
        <div class="chart" v-show="hola1" id="postsPerMonth"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import * as utils from "~/assets/js/utils.js";
import * as buildCharts from "~/assets/js/build-charts.js";
import * as chartFunctions from "~/assets/js/chart-functions.js";

const userNameInfo = gql`
  query user($userName: String!) {
    user(username: $userName) {
      numFollowing
      numFollowers
    }
  }
`;

export default {
  // apollo: {
  //   user: {
  //     query: userNameInfo,
  //     prefetch: ({ route }) => ({ username: route.params.userName }),
  //     variables() {
  //       return { username: this.$route.params.userName };
  //     },
  //   },
  // },
  props: {
    user: Object,
  },
  data() {
    return {
      hola: false,
      hola1: false,
      userData: {},
      posts: null,
      userName: this.$route.params.userName,
    };
  },
  async mounted() {
    // let temp = await this.$apollo.queries.user;

    // setTimeout(() => {
    //   this.hola = true;
    // }, 3000);
    // setTimeout(() => {
    //   this.hola1 = true;
    // }, 2000);

    Apex.chart = {
      toolbar: {
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      fontFamily: "Rubik, sans-serif",
    };

    console.log("user.dateJoined", new Date(this.user.dateJoined).getDay());
    this.posts = await chartFunctions.getAllPosts(this.userName);
    console.log(this.posts);
    this.solveCharts();
  },
  methods: {
    solveCharts() {
      let weekDayPosts = [0, 0, 0, 0, 0, 0, 0];
      let monthsPosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < this.posts.length; i++) {
        let date = new Date(this.posts[i].dateAdded);
        let weekDay = date.getDay();
        let month = date.getMonth();
        weekDayPosts[weekDay] += 1;
        monthsPosts[month] += 1;
      }
      console.log(weekDayPosts);
      this.hola = true;
      buildCharts.buildRadarChart(
        "postsPerWeekDay",
        utils.WEEK_DAYS,
        weekDayPosts,
        "Posts Per WeekDay"
      );
      this.hola1 = true;
      buildCharts.buildRadarChart(
        "postsPerMonth",
        utils.MONTHS,
        monthsPosts,
        "Posts Per Month"
      );
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  height: 30em;
}

svg {
  animation: 1s appear;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}

.chart {
  min-height: unset !important;
}

.chart {
  height: 30em;
}
</style>