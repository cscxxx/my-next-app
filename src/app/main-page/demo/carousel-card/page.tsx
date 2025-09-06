"use client";
import Demo1 from "./Demo1";
import Demo2 from "./Demo2";
import { useRouter } from "next/navigation";
export default () => {
  const router = useRouter();
  return (
    <>
      <div
        className="cursor-pointer p-2 w-[50px] rounded-md hover:bg-[#e3f1fd]"
        onClick={() => {
          router.back();
        }}
      >
        返回
      </div>
      <div className="w-full text-center h-[40px] ">
        轮播卡片，自适应宽度，自定义实现，小场景，不依赖第三方时使用
      </div>
      <div className=" flex items-center justify-between h-[200px] bg-[#787475] mb-4">
        <Demo1></Demo1>
      </div>
      <div className="w-full text-center h-[40px] ">
        轮播卡片，自适应宽度，swiper实现，使用虚拟渲染，数据量大的场景使用
      </div>
      <div className=" flex items-center justify-between h-[200px] bg-[#787475] ">
        <Demo2></Demo2>
      </div>
    </>
  );
};
