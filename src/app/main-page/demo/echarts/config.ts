import { EChartsOption } from "echarts";
export const option: EChartsOption = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  xAxis: {
    type: "category",
    axisLabel: {
      color: "#1890ff",
      fontSize: 14,
      fontWeight: "bold",
      show: true,
      //   cursor: "pointer",
    },
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    triggerEvent: true, // 开启点击事件
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
