"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFullscreen } from "ahooks";
import { useRouter } from "next/navigation";

export default () => {
  const [ratio, setRatio] = useState(1);
  const router = useRouter();
  // 使用 useRef 创建一个 ref 引用
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(containerRef);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          // console.log("父--宽度", entry.target.clientWidth);
          // console.log("父--高度", entry.target.clientHeight);
          setRatio(
            Math.min(
              (entry.target as HTMLElement).clientWidth / 1920,
              (entry.target as HTMLElement).clientHeight / 1080
            )
          );
        }
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      // 清理 ResizeObserver
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setRatio(
            Math.min(
              (entry.target as HTMLElement).clientWidth / 1920,
              (entry.target as HTMLElement).clientHeight / 1080
            )
          );
        }
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      // 清理 ResizeObserver
      resizeObserver.disconnect();
    };
  });
  return (
    <div
      ref={containerRef}
      className="bg-[skyblue] h-[calc(100vh-68px)] "
      style={{
        margin: 0,
        padding: 0,
        border: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transformOrigin: "top left",
      }}
    >
      <div
        ref={ref}
        style={{
          transform: `scale(${ratio})`,
          width: "1920px",
          height: "1080px",
          position: "absolute", // 子元素要绝对定位
        }}
        className=" grid  grid-cols-3 grid-rows-2 "
      >
        <div className="bg-[pink]">
          <div
            className="cursor-pointer p-2 w-[50px] rounded-md hover:bg-[#e3f1fd]  "
            onClick={() => {
              router.back();
            }}
          >
            返回
          </div>
          <div style={{ marginBottom: 16 }}>
            {isFullscreen ? "Fullscreen" : "Not fullscreen"}
          </div>
          <div>
            <button type="button" onClick={enterFullscreen}>
              enterFullscreen
            </button>
            <button
              type="button"
              onClick={exitFullscreen}
              style={{ margin: "0 8px" }}
            >
              exitFullscreen
            </button>
            <button type="button" onClick={toggleFullscreen}>
              toggleFullscreen
            </button>
          </div>
        </div>
        <div className="bg-[pink]">2</div>
        <div className="bg-[pink]">3</div>
        <div className="bg-[pink]">4</div>
        <div className="bg-[pink]">5</div>
        <div className="bg-[pink]">6</div>
      </div>
    </div>
  );
};
