"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface SummaryCardData {
  desProvinceName: string;
  width: number; // 用于计算宽度
}

export default ({
  summaryData = [
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
    { desProvinceName: "", width: 168 },
  ],
}) => {
  const [data, setData] = useState<SummaryCardData[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const cardItems = document?.querySelector(
    "#aviationWorkbench-summary-card-items"
  ) as HTMLElement | null;

  const handleLeftClick = () => {
    if (!cardItems) return;
    if (currentIndex === 1) return;
    setCurrentIndex((index) => index - 1);
    cardItems.style.transform = `translateX(${
      -((currentIndex - 1) * containerWidth) + containerWidth
    }px)`;
  };
  const handleRightClick = () => {
    if (!cardItems) return;
    if (currentIndex === data.length) return;
    setCurrentIndex((index) => index + 1);
    cardItems.style.transform = `translateX(${
      -(currentIndex - 1) * containerWidth - containerWidth
    }px)`;
  };

  useEffect(() => {
    const arr: SummaryCardData[] = summaryData.map((item: SummaryCardData) => ({
      desProvinceName: item?.desProvinceName?.replace("省", "") ?? "",
      width: 168,
    }));
    const newArr: SummaryCardData[][] = [];
    let tempArr: SummaryCardData[] = [];
    let width = 0;
    arr.forEach((item: SummaryCardData) => {
      width = width + item.width;
      if (width < containerWidth) {
        tempArr.push(item);
      } else {
        newArr.push(tempArr);
        tempArr = [];
        tempArr.push(item);
        width = 0;
        width = item.width;
      }
    });
    // 把剩余的数据添加到数组中
    newArr.push(tempArr);
    // console.log(newArr);
    setData(newArr);
    if (cardItems?.style) {
      cardItems.style.transform = `translateX(${0}px)`;
      setCurrentIndex(1);
    }
  }, [containerWidth, cardItems]);

  useEffect(() => {
    const element = document.querySelector(
      "#aviationWorkbench-summary-card-container"
    );
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

  return (
    <>
      <div className="bg-[#f1f2f9] w-full rounded-[8px] h-[76px] flex space-between items-center gap-[10px] relative">
        {currentIndex === 1 ? (
          <></>
        ) : (
          <div
            className="w-[30px] h-full text-center leading-[78px]  rounded-[8px] bg-gradient-to-l from-transparent to-[#f1f2f9] to-40% absolute cursor-pointer"
            style={{ float: "left", height: "100%", zIndex: 100 }}
            onClick={() => {
              handleLeftClick();
            }}
          >
            {/* <LeftOutlined /> */}
            {"<"}
          </div>
        )}
        <div
          className="flex-1 flex flex-row items-center h-[100%] mr-[30px] ml-[30px]"
          id="aviationWorkbench-summary-card-container"
        >
          <div className="relative overflow-hidden w-full h-full">
            <div
              className={clsx(
                `absolute h-full transition-all duration-500 trans `
              )}
              style={{ width: `${containerWidth * data.length}px` }}
              id="aviationWorkbench-summary-card-items"
            >
              {data?.map((item: SummaryCardData[], index: number) => (
                <div
                  key={index}
                  style={{ width: containerWidth }}
                  className="float-left h-full flex flex-row items-center justify-center gap-[12px]"
                >
                  {item?.map((i, index) => (
                    <div
                      key={index}
                      style={{ width: i.width }}
                      className={clsx(
                        `flex flex-col items-center justify-center gap-[12px] h-[60px] rounded-[4px] px-[10px] w-[${i.width}]px bg-[#8fbeb4]`
                      )}
                    >
                      <div>共{summaryData.length}个卡片</div>
                      <div>宽度{`${i.width}`}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentIndex === data.length ? (
          <></>
        ) : (
          <div
            className="w-[30px] h-full text-center leading-[78px]  rounded-[8px] bg-gradient-to-r from-transparent to-[#f1f2f9] to-50% absolute cursor-pointer "
            style={{ float: "right", height: "100%", right: 0, zIndex: 100 }}
            onClick={() => {
              handleRightClick();
            }}
          >
            {/* <RightOutlined /> */}
            {">"}
          </div>
        )}
      </div>
    </>
  );
};
