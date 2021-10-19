let chartColor = "#3B82F6";

export function buildRadarChart(htmlObjectId, labels, data, name) {
  var options = {
    series: [
      {
        name: name,
        data: data
      }
    ],
    chart: {
      height: "100%",
      with: "100%",
      type: "radar"
    },
    grid: {
      padding: {
        bottom: -50
      }
    },
    responsive: [
      {
        breakpoint: 1030,
        options: {
          chart: {
            height: "90%",
          },
          grid: {
            padding: {
              bottom: -30
            }
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          }
        }
      },
      {
        breakpoint: 300,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: "10px"
              }
            }
          }
        }
      }
    ],
    fill: {
      opacity: 0.3,
      colors: [chartColor]
    },
    stroke: {
      colors: [chartColor]
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [chartColor]
      }
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "#D1D5DB",
          fill: {
            colors: ["#F3F4F6", "#fff"]
          }
        },
        title: {
          align: "center"
        }
      }
    },
    title: {
      text: name,
      style: {
        fontSize: "16px",
        fontWeight: "bold"
      },
      align: "left"
    },
    colors: ["#FF4560"],
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColor: chartColor,
      strokeWidth: 2
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val;
        }
      }
    },
    xaxis: {
      categories: labels,
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
            "#374151",
            "#374151",
            "#374151",
            "#374151",
            "#374151"
          ],
          fontSize: "16px"
        }
      }
    },
    yaxis: {
      labels: {
        // formatter: function(val) {
        //   return val.toFixed(0);
        // },
        style: {
          fontSize: "12px"
        }
      }
    }
  };

  var chart = new ApexCharts(
    document.getElementById(htmlObjectId),
    options
  ).render();
}
