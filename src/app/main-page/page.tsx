"use client";
import Ballpit from "@/components/animate/Ballpit";
import SplitText from "@/components/animate/SplitText";
import React, { useRef } from "react";
import DragList from "@/components/drag-list";
import { useRouter } from "next/navigation";
// import { formatDate, enumToArray, Button, Header } from "@shuchaoxxx/csc-utils";

export default function Page() {
  const router = useRouter();

  enum Status {
    PENDING,
    SUCCESS,
    ERROR,
  }

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const itemsClassStyle =
    "h-full bg-blue-500 w-[100px] flex items-center justify-center px-4 py-2 text-white cursor-pointer m-6  rounded-md";

  const datalist = [
    { name: "promise", id: "id-promise" },
    { name: "Filber", id: "id-Filber" },
    { name: "canves", id: "id-canves", href: "/main-page/demo/canves" },
    { name: "three", id: "id-three" },
    { name: "大屏", id: "id-大屏", href: "/main-page/demo/big-screen" },
    {
      name: "自适应走马灯卡片",
      id: "CarouselCard",
      href: "/main-page/demo/carousel-card",
    },
    { name: "AI", id: "id-AI" },
    { name: "应用", id: "id-应用" },
    { name: "class", id: "id-class" },
  ];
  // 跳转到指定界面
  const handleItemClick = (href: string) => {
    router.push(href);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 68px)",
        // overflow: "hidden",
      }}
    >
      <SplitText
        text="Hello, Welcome to CSC!"
        className="h-[60px] text-4xl leading-[90px] font-semibold text-center inline-block w-full"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <DragList className="flex items-center justify-center">
        {datalist.map((item) => {
          return (
            <div
              draggable={true}
              key={item.id}
              className={itemsClassStyle}
              onClick={() => {
                if (item.href) {
                  handleItemClick(item.href);
                }
              }}
            >
              {item.name}
            </div>
          );
        })}
      </DragList>
      {/* <div
        style={{
          height: "calc(100vh - 175px)",
        }}
      >
        <Ballpit
          className=""
          count={100}
          gravity={0.7}
          friction={1}
          wallBounce={1}
          followCursor={false}
          colors={["#007BFF", "#FF6B6B", "#FFD700", "#4CAF50"]}
          lightIntensity={10}
        />
      </div> */}
    </div>
  );
}
