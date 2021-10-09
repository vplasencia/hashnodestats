<template>
  <!-- <div class="w-full border-2 rounded-lg p-2 md:p-5 shadow"> -->
    <div class="chart" :id="'chart'+ radarChartObj.idString"></div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    radarChartObj: Object
  },
  mounted() {
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
    let chartColor = "#3B82F6";
    var options = {
      series: [
        {
          name: "Number of Articles",
          data: [30, 100, 40, 30, 50, 80, 33],
        },
      ],
      chart: {
        // height: 460,
        height: "100%",
        type: "radar",
      },
      grid: {
        padding: {
          bottom: -75,
        },
      },
      fill: {
        opacity: 0.3,
        colors: [chartColor],
      },
      stroke: {
        colors: [chartColor],
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: [chartColor],
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 300,
      //     options: {
      //       chart: {
      //         height: 200,
      //       },
      //       plotOptions: {
      //         radar: {
      //           size: 40,
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 370,
      //     options: {
      //       chart: {
      //         height: 250,
      //       },
      //       plotOptions: {
      //         radar: {
      //           size: 55,
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 769,
      //     options: {
      //       chart: {
      //         height: 320,
      //       },
      //       plotOptions: {
      //         radar: {
      //           size: 90,
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 1025,
      //     options: {
      //       chart: {
      //         height: 420,
      //       },
      //       plotOptions: {
      //         radar: {
      //           size: 140,
      //         },
      //       },
      //       title: {
      //         align: "center",
      //       },
      //     },
      //   },
      // ],
      plotOptions: {
        radar: {
          // size: 90,
          polygons: {
            strokeColors: "#D1D5DB",
            fill: {
              colors: ["#F3F4F6", "#fff"],
            },
          },
          title: {
            align: "center",
          },
        },
      },
      title: {
        text: "Radar with Polygon Fill",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
        align: "left",
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: chartColor,
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        labels: {
          style: {
            colors: [
              "#374151",
              "#374151",
              "#374151",
              "#374151",
              "#374151",
              "#374151",
              "#374151",
            ],
            fontSize: "16px",
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          },
          style: {
            fontSize: "12px",
          },
        },
      },
    };

    var chart = new ApexCharts(
      document.querySelector("#chart" + this.radarChartObj.idString),
      options
    ).render();
  },
};
</script>

<style scoped>
.chart {
  min-height: unset !important;
}

.chart {
  height: 30em;
}
</style>