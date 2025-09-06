"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { splitEvery } from "ramda";
import { Virtual } from "swiper/modules";

type DataType = {
  name: string;
};
export default () => {
  const orginData: DataType[] = new Array(30000).fill({
    name: "测试",
  });
  const ref = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const itemWidth = 300;
  const [data, setData] = useState<DataType[][]>([]);
  const [isFirstLast, setIsFirstLast] = useState<[boolean, boolean]>([
    true,
    false,
  ]);
  useEffect(() => {
    const count = Math.floor(containerWidth / (itemWidth + 16));
    if (!count) return;
    const chunked = splitEvery(count, orginData);
    setData(chunked);
  }, [containerWidth, swiper]);

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setContainerWidth(entry.contentRect.width);
      });
    });
    if (element) {
      resizeObserver.observe(element as Element);
    }
    return () => {
      if (element) {
        resizeObserver.unobserve(element as Element);
      }
    };
  }, []);

  const renderData = data.map((item, index) => (
    <SwiperSlide key={index}>
      <div className="h-[168px] py-[16px] flex items-center justify-center gap-[16px] bg-[#f1f2f9] ">
        {Array.isArray(item) &&
          item.map((item, i) => (
            <div
              key={i}
              className="my-[18px] bg-slate-400 h-full rounded-[8px] flex flex-col items-center justify-center"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <div>共{orginData.length}个卡片</div>
              <div>
                第{index + 1}个容器，第{i + 1}个元素{item.name}
              </div>
            </div>
          ))}
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="w-full h-full p-4 flex items-center justify-between rounded-[8px]">
      <div
        className="w-[30px] h-full bg-[#f1f2f9] rounded-l-[8px] flex justify-center items-center cursor-pointer "
        onClick={() => {
          swiper?.slidePrev();
        }}
      >
        {!isFirstLast[0] && "<"}
      </div>
      <div className="w-full h-full overflow-hidden" ref={ref}>
        <Swiper
          onSwiper={setSwiper}
          spaceBetween={6}
          onSlideChange={(swiper) => {
            setIsFirstLast([swiper.isBeginning, swiper.isEnd]);
          }}
          modules={[Virtual]}
          virtual
        >
          {renderData}
        </Swiper>
      </div>
      <div
        className="w-[30px] h-full bg-[#f1f2f9] rounded-r-[8px] flex justify-center items-center cursor-pointer "
        onClick={() => {
          swiper?.slideNext();
        }}
      >
        {!isFirstLast[1] && ">"}
      </div>
    </div>
  );
};
