"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { option } from "./config";
export default function Page() {
  const router = useRouter();
  const [name, setName] = useState<any>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chart = echarts.init(ref.current!);

    chart.setOption(option);
    // 添加点击事件监听
    chart.on("click", (params) => {
      if (params.componentType === "xAxis") {
        console.log("点击的x轴标签:", params.value);
        setName(params.value);
        // 执行自定义逻辑...
      }
    });
    return () => chart.dispose();
  }, []);
  return (
    <div>
      <div
        className="cursor-pointer m-2 px-2 w-[50px] rounded-md hover:bg-[#e3f1fd]"
        onClick={() => router.back()}
      >
        返回
      </div>
      {name}
      <div ref={ref} style={{ width: "100%", height: 500 }}></div>
    </div>
  );
}
