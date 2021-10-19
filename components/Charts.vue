<template>
  <div>
    <div class="px-2 w-full mb-10">
      <div class="text-base md:text-lg border rounded-lg shadow-md p-5">
        <ChartPreloader v-if="!userInfo" />
        <div
          v-if="userInfo"
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
              {{ dateJoined }}
            </span>
          </div>
        </div>
      </div>
    </div>
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
          <div>
            <span class="font-semibold">Featured Posts:</span>
            <span>
              {{ featuredPostsCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 px-2">
      <div
        class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow-md"
      >
        <ChartPreloader v-if="!hola" />
        <div class="chart" v-show="hola" id="postsPerWeekDay"></div>
      </div>
      <div
        class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow-md"
      >
        <ChartPreloader v-if="!hola1" />
        <div class="chart" v-show="hola1" id="postsPerMonth"></div>
      </div>
    </div>
    <div class="flex flex-col place-content-center my-10">
      <div class="my-2 overflow-x-auto mx-2 lg:mx-8">
        <div class="py-2 align-middle inline-block min-w-full lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    class="
                      px-6
                      py-4
                      text-left text-sm
                      font-semibold
                      uppercase
                      tracking-wider
                    "
                  >
                    Post Title
                  </th>
                  <th
                    class="
                      px-6
                      py-4
                      text-left text-sm
                      font-semibold
                      uppercase
                      tracking-wider
                    "
                  >
                    Reactions
                  </th>
                </tr>
              </thead>
              <tbody v-if="postsTitle === null && postsReactions === null">
                <tr>
                  <td>
                    <ChartPreloader
                      v-if="postsTitle === null && postsReactions === null"
                    />
                  </td>
                  <td>
                    <ChartPreloader
                      v-if="postsTitle === null && postsReactions === null"
                    />
                  </td>
                </tr>
              </tbody>
              <tbody v-else class="bg-white divide-y divide-gray-200">
                <tr v-for="i in postIndex" :key="i">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>{{ postsTitle[i - 1] }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>{{ postsReactions[i - 1] }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import * as utils from "~/assets/js/utils.js";
import * as buildCharts from "~/assets/js/build-charts.js";
import * as chartFunctions from "~/assets/js/chart-functions.js";

let dayjs = require("dayjs");
import "dayjs/locale/es";
// import es from 'dayjs/locale/es';
// import esLocale from "dayjs/locale/es";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

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
      dateJoined: null,
      userInfo: false,
      featuredPostsCount: 0,
      postsTitle: null,
      postsReactions: null,
      postIndex: 0,
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

    this.featuredPostsCount = 0;

    // console.log(es.weekdays);
    // dayjs().locale(es.name);
    this.dateJoined = dayjs(this.user.dateJoined);
    this.userInfo = true;

    console.log("user.dateJoined", new Date(this.user.dateJoined).getDay());
    this.posts = await chartFunctions.getAllPosts(this.userName);
    console.log(this.posts);
    this.solveCharts();
    utils.sortArrays(this.postsTitle, this.postsReactions);
    console.log("posts", this.postsTitle.length);
    if (this.postsTitle.length > 4) {
      this.postIndex = 5;
    } else {
      this.postIndex = this.postsTitle.length;
    }
    console.log(this.postsTitle);
    console.log(this.postsReactions);
  },
  methods: {
    solveCharts() {
      this.postsTitle = [];
      this.postsReactions = [];
      let weekDayPosts = [0, 0, 0, 0, 0, 0, 0];
      let monthsPosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < this.posts.length; i++) {
        this.postsTitle.push(this.posts[i].title);
        this.postsReactions.push(this.posts[i].totalReactions);
        let date = new Date(this.posts[i].dateAdded);
        let weekDay = date.getDay();
        let month = date.getMonth();
        weekDayPosts[weekDay] += 1;
        monthsPosts[month] += 1;
        if (this.posts[i].dateFeatured !== null) {
          this.featuredPostsCount += 1;
        }
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