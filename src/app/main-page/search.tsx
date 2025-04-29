"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";
export default () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full position: relative ">
      <form
        ref={ref}
        action={() => {
          console.log("search");
        }}
        // 修改 onSubmit 处理函数
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const searchStr = formData.get("searchStr") as string;
          console.log("submit", searchStr);
        }}
        //   className=""
        className={clsx("w-full flex items-center border-2 rounded-md pr-5", {
          "border-blue-600": isFocused,
        })}
      >
        <MagnifyingGlassIcon height={25} className=" px-2 cursor-pointer" />
        <input
          name="searchStr"
          placeholder="Search..."
          className="w-full h-[48px] !focus:border-none outline-none"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            ref.current?.requestSubmit(); // 新增提交触发
          }}
        ></input>
      </form>
      {/* <div className="position: absolute w-full bg-[pink] rounded-md z-10">
        123
      </div> */}
    </div>
  );
};
