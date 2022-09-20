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
        <ChartPreloader v-if="!readyPostsPerWeekDayChart" />
        <div class="chart" v-show="readyPostsPerWeekDayChart" id="postsPerWeekDay"></div>
      </div>
      <div
        class="chart-wrapper w-full border-2 rounded-lg p-2 md:p-5 shadow-md"
      >
        <ChartPreloader v-if="!readyPostsPerMonthChart" />
        <div class="chart" v-show="readyPostsPerMonthChart" id="postsPerMonth"></div>
      </div>
    </div>
    <div class="flex flex-col place-content-center my-10">
      <div class="flex place-content-center pb-5">
        <span class="text-lg font-medium">Top Posts</span>
      </div>
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
                      <!-- <div>{{ postsTitle[i - 1] }}</div> -->
                      <a
                        :href="
                          user.publicationDomain !== null &&
                          user.publicationDomain !== ''
                            ? 'http://' +
                              user.publicationDomain +
                              '/' +
                              postsIdSlug[postsId[i - 1]]
                            : user.publicationDomain === null
                            ? 'https://hashnode.com/@' + user.username
                            : 'https://' +
                              user.username +
                              '.hashnode.dev/' +
                              postsIdSlug[postsId[i - 1]]
                        "
                        target="_blank"
                        rel="noreferrer noopener nofollow"
                        class="post-title"
                        >{{ postsIdTitle[postsId[i - 1]] }}</a
                      >
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
        <!-- <svg
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
        </svg> -->
        <span>Download Charts</span>
      </button>
      <button class="download-all-charts" @click="generatePdfReport()">
        <!-- <svg
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
        </svg> -->
        <span>Download PDF Report</span>
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

// const userNameInfo = gql`
//   query user($userName: String!) {
//     user(username: $userName) {
//       numFollowing
//       numFollowers
//     }
//   }
// `;

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
      readyPostsPerWeekDayChart: false,
      readyPostsPerMonthChart: false,
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
      postsIdTitle: {},
      postsIdSlug: {},
      postsId: [],
    };
  },
  async mounted() {
    this.chartsInstances = [];
    // let temp = await this.$apollo.queries.user;

    // setTimeout(() => {
    //   this.readyPostsPerWeekDayChart = true;
    // }, 3000);
    // setTimeout(() => {
    //   this.readyPostsPerMonthChart = true;
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
      // toolbar: {
      //   show: false,
      // },
      fontFamily: "Rubik, sans-serif",
    };

    this.featuredPostsCount = 0;

    // console.log(es.weekdays);
    // dayjs().locale(es.name);
    this.dateJoined = dayjs(this.user.dateJoined);
    this.userInfo = true;

    if (
      this.user.publicationDomain === null &&
      this.user.username !== "hashnode"
    ) {
      this.posts = [];
      this.solveCharts();
      return;
    }

    // console.log("user.dateJoined", new Date(this.user.dateJoined).getDay());
    this.posts = await chartFunctions.getAllPosts(this.userName);
    // console.log(this.posts);
    this.solveCharts();
    utils.sortArrays(this.postsId, this.postsReactions);
    // console.log("posts", this.postsTitle.length);
    if (this.postsTitle.length > 4) {
      this.postIndex = 5;
    } else {
      this.postIndex = this.postsTitle.length;
    }
    // console.log(this.postsTitle);
    // console.log(this.postsReactions);
  },
  methods: {
    solveCharts() {
      this.postsTitle = [];
      this.postsReactions = [];
      let weekDayPosts = [0, 0, 0, 0, 0, 0, 0];
      let monthsPosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < this.posts.length; i++) {
        this.postsId.push(this.posts[i]._id);
        this.postsIdTitle[this.posts[i]._id] = this.posts[i].title;
        this.postsIdSlug[this.posts[i]._id] = this.posts[i].slug;
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
      // console.log(weekDayPosts);
      this.readyPostsPerWeekDayChart = true;
      let chartPostsPerWeekDay = buildCharts.buildRadarChart(
        this.user.username,
        "postsPerWeekDay",
        utils.WEEK_DAYS,
        weekDayPosts,
        "Posts Per Day of the Week"
      );
      this.readyPostsPerMonthChart = true;
      let chartPostsPerMonth = buildCharts.buildRadarChart(
        this.user.username,
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
        a.download = this.user.username + " - " + "User Info.png";
        a.click();
        a.remove();
      });
      html2canvas(document.getElementById("posts-info")).then((canvas) => {
        var dataURL = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = dataURL;
        a.download = this.user.username + " - " + "Posts Info.png";
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
    generatePdfReportPage1(doc, initW, initH, docMidWidth, docMidHeight) {
      doc.setFontSize(18).setFont(undefined, "bold");
      // console.log("Font size", doc.getFontSize());
      doc.text(
        docMidWidth - doc.getTextWidth("Hashnode Report") / 2,
        initH,
        "Hashnode Report"
      );
      initH += 10;
      let dateText = dayjs().toString();
      doc.setFontSize(12).setFont(undefined, "normal");
      doc.text(docMidWidth - doc.getTextWidth(dateText) / 2, initH, dateText);

      doc.setFontSize(16);

      let imageProfile = document.getElementById("image-profile");

      let textPositionH = initH;

      if (imageProfile) {
        let userProfileDataUrl = imageProfile.src;

        let imageWidth = imageProfile.width;
        let imageHeight = imageProfile.height;

        let propierties = doc.getImageProperties(userProfileDataUrl);
        // console.log("propierties", propierties);

        let imageHeightMM = utils.convertFromPXToMM(propierties.width);
        let imageWidhtMM = utils.convertFromPXToMM(propierties.height);

        initW = docMidWidth - imageWidhtMM / 2;

        initH += 30;

        doc.addImage(userProfileDataUrl, "PNG", initW, initH);
        textPositionH = initH + imageHeightMM + 20;
      } else {
        textPositionH += 20;
      }
      doc.text(
        docMidWidth - doc.getTextWidth(this.user.name) / 2,
        textPositionH,
        this.user.name
      );
      doc.setTextColor("#2563eb");
      doc.textWithLink(
        "@" + this.user.username,
        docMidWidth - doc.getTextWidth("@" + this.user.username) / 2,
        textPositionH + 10,
        { url: document.getElementById("blog-link").href }
      );
      doc.setTextColor("#374151");
    },
    generatePdfReportPage2(doc, initW, initH) {
      let textW = 0;
      doc.setFont(undefined, "bold");
      doc.text(initW, initH, "Following:");
      textW = doc.getTextWidth("Following:");
      doc.setFont(undefined, "normal");
      doc.text(initW + 2 + textW, initH, this.user.numFollowing.toString());
      doc.setFont(undefined, "bold");
      doc.text(initW, initH + 10, "Followers:");
      textW = doc.getTextWidth("Followers:");
      doc.setFont(undefined, "normal");
      doc.text(
        initW + 2 + textW,
        initH + 10,
        this.user.numFollowers.toString()
      );
      doc.setFont(undefined, "bold");
      doc.text(initW, initH + 20, "Date Joined:");
      textW = doc.getTextWidth("Date Joined:");
      doc.setFont(undefined, "normal");
      doc.text(initW + 2 + textW, initH + 20, this.dateJoined.toString());

      doc.setFont(undefined, "bold");
      doc.text(initW, initH + 40, "Posts:");
      textW = doc.getTextWidth("Posts:");
      doc.setFont(undefined, "normal");
      doc.text(initW + 2 + textW, initH + 40, this.posts.length.toString());
      doc.setFont(undefined, "bold");
      doc.text(initW, initH + 50, "Reactions:");
      textW = doc.getTextWidth("Reactions:");
      doc.setFont(undefined, "normal");
      doc.text(
        initW + 2 + textW,
        initH + 50,
        this.user.numReactions ? this.user.numReactions.toString() : "0"
      );
      doc.setFont(undefined, "bold");
      doc.text(initW, initH + 60, "Featured Posts:");
      textW = doc.getTextWidth("Featured Posts:");
      doc.setFont(undefined, "normal");
      doc.text(
        initW + 2 + textW,
        initH + 60,
        this.featuredPostsCount.toString()
      );
    },
    async generatePdfReportPageCharts(doc, docMidWidth, docMidHeight) {
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
    },
    generatePdfReportPostsPage(doc, initH, docMidWidth) {
      doc.setFontSize(18).setFont(undefined, "bold");
      doc.text(
        docMidWidth - doc.getTextWidth("Top Posts") / 2,
        initH,
        "Top Posts"
      );
      doc.setFontSize(16).setFont(undefined, "normal");
      if (this.posts.length !== 0) {
        doc.autoTable({ startY: initH + 20, html: "#posts-reactions-table" });
      } else {
        doc.text(
          docMidWidth - doc.getTextWidth("There are no published posts") / 2,
          initH + 20,
          "There are no published posts"
        );
      }
    },
    addElementsFooter(doc) {
      const pageCount = doc.internal.getNumberOfPages();

      let textW = 0;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        textW = doc.getTextWidth(String(i));
        doc.text(String(i), doc.internal.pageSize.width / 2 - textW / 2, 287);
        textW = doc.getTextWidth("Hashnode Stats");
        // doc.text(
        //   "Hashnode Stats",
        //   doc.internal.pageSize.width - textW - 10,
        //   287
        // );
        doc.textWithLink(
          "Hashnode Stats",
          doc.internal.pageSize.width - textW - 10,
          287,
          { url: "https://hashnodestats.vercel.app/" }
        );
      }
    },
    async generatePdfReport() {
      const doc = new jsPDF();
      doc.setTextColor("#374151");

      let docWidth = doc.internal.pageSize.getWidth();
      let docHeight = doc.internal.pageSize.getHeight();
      let docMidWidth = docWidth / 2;
      let docMidHeight = docHeight / 2;

      this.generatePdfReportPage1(doc, 30, 30, docMidWidth, docMidHeight);

      doc.addPage();

      this.generatePdfReportPage2(doc, 30, 30);

      doc.addPage();

      await this.generatePdfReportPageCharts(doc, docMidWidth, docMidHeight);

      this.generatePdfReportPostsPage(doc, 30, docMidWidth);

      this.addElementsFooter(doc);

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

.post-title {
  @apply underline hover:no-underline;
}
</style>