"use client";
import Ballpit from "@/components/animate/Ballpit";
import SplitText from "@/components/animate/SplitText";
import React from "react";
// import { formatDate, enumToArray, Button, Header } from "@shuchaoxxx/csc-utils";

export default function Page() {
  enum Status {
    PENDING,
    SUCCESS,
    ERROR,
  }

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div
      className=" relative "
      style={{
        height: "calc(100vh - 68px)",
      }}
    >
      <SplitText
        text="Hello, Welcome to CSC!"
        className="text-4xl font-semibold text-center inline-block w-full p-10 "
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
      <Ballpit
        className="absolute top-0 left-0 w-full h-full"
        count={100}
        gravity={0.7}
        friction={1}
        wallBounce={1}
        followCursor={false}
        colors={["#007BFF", "#FF6B6B", "#FFD700", "#4CAF50"]}
        lightIntensity={10}
      />
    </div>
  );
}
