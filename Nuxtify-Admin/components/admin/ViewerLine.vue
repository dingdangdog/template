<template>
  <!-- 访客曲线：每日,每天,每周,每月 -->
  <div>
    <h4>访客趋势</h4>
    <VChart :option="optionRef"></VChart>
  </div>
</template>

<script setup lang="ts">
import { dateFormater } from "@/utils/admin/common";
// 使用 props 来接收外部传入的参数
// const { title, width, height } = defineProps(["title", "width", "height"]);

// 横轴数据
const xAxisList: string[] = ["一", "二", "三", "四", "五", "六", "日"];
// 支出数据
const dataListViewer: number[] = [1, 2, 3, 4, 5, 6, 7];
// 收入数据
const dataListSearch: number[] = [7, 6, 5, 4, 3, 2, 1];

const optionRef = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },
  legend: {
    selected: {
      访问量: true,
      搜索量: true,
    },
    data: [
      {
        name: "访问量",
        textStyle: {
          color: "rgb(217,159,8)",
        },
      },
      {
        name: "搜索量",
        textStyle: {
          color: "rgb(76, 152, 112)",
        },
      },
    ], // 系列的名称，与 series 中的 name 对应
  },
  toolbox: {
    feature: {
      // 下载按钮
      // saveAsImage: {}
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 80,
      end: 100,
    },
    {
      start: 80,
      end: 100,
    },
  ],
  xAxis: {
    name: "日期",
    type: "category",
    data: xAxisList,
  },
  yAxis: {
    name: "数量",
    show: true,
    type: "value",
    min: "0",
  },
  series: [
    {
      name: "访问量",
      type: "line",
      symbol: "circle",
      symbolSize: 6,
      areaStyle: {},
      itemStyle: {
        color: "rgb(217,159,8)", // 支出颜色
      },
      emphasis: {
        focus: "series",
      },
      data: dataListViewer,
    },
    {
      name: "搜索量",
      type: "line",
      symbol: "circle",
      symbolSize: 6,
      areaStyle: {},
      itemStyle: {
        color: "rgb(76, 152, 112)", // 收入颜色
      },
      emphasis: {
        focus: "series",
      },
      data: dataListSearch,
    },
  ],
});

// 缩放比例动态计算，保证美观
const zoomChange = (total: number): number => {
  return (Math.ceil(total / 30) - 1) * 10;
};

optionRef.value.xAxis.data = xAxisList;
optionRef.value.series[0].data = dataListViewer;
optionRef.value.series[1].data = dataListSearch;
//     optionRef.value.series[2].data = notInOut
optionRef.value.dataZoom[0].start = zoomChange(xAxisList.length);
optionRef.value.dataZoom[1].start = zoomChange(xAxisList.length);
</script>

<style scoped>
.row-header {
  margin: 0.5rem;
}

#lineDiv {
  padding: 10px;
}

@media screen and (max-width: 480px) {
  #lineDiv {
    font-size: small;
  }
}
</style>
