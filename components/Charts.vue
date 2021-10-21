<template>
  <div>
    <div id="user-info" class="px-2 w-full mb-10">
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
    <div id="posts-info" class="px-2 w-full mb-10">
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
            <table
              id="posts-reactions-table"
              class="min-w-full divide-y divide-gray-200"
            >
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
    <div class="flex justify-center items-center py-10 px-2 space-x-3">
      <button class="download-all-charts" @click="saveChartImages()">
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
          class="feather feather-download"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Download Charts</span>
      </button>
      <button class="download-all-charts" @click="generatePdfReport()">
        <span>Generate PDF Report</span>
      </button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import * as utils from "~/assets/js/utils.js";
import * as buildCharts from "~/assets/js/build-charts.js";
import * as chartFunctions from "~/assets/js/chart-functions.js";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

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
      chartsInstances: [],
    };
  },
  async mounted() {
    this.chartsInstances = [];
    // let temp = await this.$apollo.queries.user;

    // setTimeout(() => {
    //   this.hola = true;
    // }, 3000);
    // setTimeout(() => {
    //   this.hola1 = true;
    // }, 2000);

    Apex.chart = {
      // toolbar: {
      //   tools: {
      //     download: true,
      //     selection: false,
      //     zoom: false,
      //     zoomin: false,
      //     zoomout: false,
      //     pan: false,
      //     reset: false,
      //   },
      // },
      toolbar: {
        show: false,
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
      let chartPostsPerWeekDay = buildCharts.buildRadarChart(
        "postsPerWeekDay",
        utils.WEEK_DAYS,
        weekDayPosts,
        "Posts Per WeekDay"
      );
      this.hola1 = true;
      let chartPostsPerMonth = buildCharts.buildRadarChart(
        "postsPerMonth",
        utils.MONTHS,
        monthsPosts,
        "Posts Per Month"
      );
      this.chartsInstances.push(chartPostsPerWeekDay);
      this.chartsInstances.push(chartPostsPerMonth);
    },
    saveChartImages() {
      html2canvas(document.getElementById("user-info")).then((canvas) => {
        var dataURL = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = dataURL;
        a.download = this.imageName + ".png";
        a.click();
        a.remove();
      });
      html2canvas(document.getElementById("posts-info")).then((canvas) => {
        var dataURL = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = dataURL;
        a.download = this.imageName + ".png";
        a.click();
        a.remove();
      });
      for (let i = 0; i < this.chartsInstances.length; i++) {
        let chart = this.chartsInstances[i].instance;
        chart.dataURI().then(({ imgURI, blob }) => {
          let a = document.createElement("a");
          a.href = imgURI;
          a.download =
            this.user.username + " - " + this.chartsInstances[i].name + ".png";
          a.click();
          a.remove();
        });
      }
    },
    async generatePdfReport() {
      const doc = new jsPDF();
      doc.setTextColor("#374151");
      doc.setFont("Rubik");
      
      let docWidth = doc.internal.pageSize.getWidth();
      let docHeight = doc.internal.pageSize.getHeight();
      let docMidWidth = docWidth / 2;
      let docMidHeight = docHeight / 2;

      // let userInfoCanvas = await html2canvas(
      //   document.getElementById("user-info")
      // );
      // let userInfoDataUrl = userInfoCanvas.toDataURL("image/png");

      // doc.addImage(userInfoDataUrl, "PNG", docMidWidth, docMidHeight);

      // doc.addPage();

      let imageProfile = document.getElementById("image-profile");

      let userProfileDataUrl = imageProfile.src;

      let imageWidth = imageProfile.width;
      let imageHeight = imageProfile.height;

      let imageHeightMM = utils.convertFromPXToMM(imageHeight);
      let imageWidhtMM = utils.convertFromPXToMM(imageWidth);
      let initW = docMidWidth - imageWidhtMM;

      let initH = docMidHeight / 2 - imageHeightMM;

      doc.text(initW, initH, "Hashnode Report");
      initH += 10;
      doc.text(initW, initH, dayjs().toString());

      initH += 20;

      doc.addImage(userProfileDataUrl, "PNG", initW, initH);

      let textPositionH = (initH + imageHeightMM) * 2;
      let textPositionW = initW;
      doc.text(textPositionW, textPositionH, this.user.name);
      doc.setTextColor("#2563eb");
      doc.textWithLink(
        "@" + this.user.username,
        textPositionW,
        textPositionH + 10,
        { url: document.getElementById("blog-link").href}
      );
      doc.setTextColor("#374151");

      doc.addPage();

      doc.text(initW, initH, "Following:");
      doc.text(
        initW + 2 + doc.getTextWidth("Following:"),
        initH,
        this.user.numFollowing.toString()
      );
      doc.text(initW, initH + 10, "Followers:");
      doc.text(
        initW + 2 + doc.getTextWidth("Followers:"),
        initH + 10,
        this.user.numFollowers.toString()
      );
      doc.text(initW, initH + 20, "Date Joined:");
      doc.text(
        initW + 2 + doc.getTextWidth("Date Joined:"),
        initH + 20,
        this.dateJoined.toString()
      );

      doc.text(initW, initH + 40, "Posts:");
      doc.text(
        initW + 2 + doc.getTextWidth("Posts:"),
        initH + 40,
        this.posts.length.toString()
      );
      doc.text(initW, initH + 50, "Reactions:");
      doc.text(
        initW + 2 + doc.getTextWidth("Reactions:"),
        initH + 50,
        this.user.numReactions ? this.user.numReactions.toString() : "0"
      );
      doc.text(initW, initH + 60, "Featured Posts:");
      doc.text(
        initW + 2 + doc.getTextWidth("Featured Posts:"),
        initH + 60,
        this.featuredPostsCount.toString()
      );
      doc.addPage();

      for (let i = 0; i < this.chartsInstances.length; i++) {
        let { imgURI, blob } = await this.chartsInstances[i].instance.dataURI();

        let chartWidth = document.getElementById(
          this.chartsInstances[i].id
        ).offsetWidth;
        let chartHeight = document.getElementById(
          this.chartsInstances[i].id
        ).offsetHeight;

        let width = utils.convertFromPXToMM(chartWidth);
        let height = utils.convertFromPXToMM(chartHeight);

        let chartMidWidth = width / 2;
        let chartMidHeight = height / 2;

        let initWidth = docMidWidth - chartMidWidth;
        let initHeight = docMidHeight - chartMidHeight;

        doc.addImage(imgURI, "PNG", initWidth, initHeight);

        doc.addPage();
      }

      doc.autoTable({ html: "#posts-reactions-table" });

      let docName = this.user.username + " - " + "Report.pdf";
      doc.save(docName);
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

.download-all-charts {
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