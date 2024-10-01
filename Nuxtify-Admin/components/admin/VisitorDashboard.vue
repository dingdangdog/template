<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const visitorLineOptions = ref({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
    {
      data: [233, 122, 455, 666, 777, 333, 444],
      type: "line",
      smooth: true,
    },
  ],
});

const visitorLocationOptions = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});

const visitorSourceOptions = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});

onMounted(() => {
  let lineDiv = document.getElementById("lineDiv");
  let lineChart = echarts.init(lineDiv);
  lineChart.setOption(visitorLineOptions.value);

  let locationDiv = document.getElementById("locationDiv");
  let locationChart = echarts.init(locationDiv);
  locationChart.setOption(visitorLocationOptions.value);

  let sourceDiv = document.getElementById("sourceDiv");
  let sourceChart = echarts.init(sourceDiv);
  sourceChart.setOption(visitorSourceOptions.value);
});
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <div
          id="lineDiv"
          style="height: 40vh; width: 40vw; padding: 1rem"
        ></div>
      </v-col>
      <v-col cols="12" sm="6">
        <div
          id="locationDiv"
          style="height: 40vh; width: 40vw; padding: 1rem"
        ></div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <div
          id="sourceDiv"
          style="height: 40vh; width: 40vw; padding: 1rem"
        ></div>
      </v-col>
      <v-col cols="12" sm="6"> </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
