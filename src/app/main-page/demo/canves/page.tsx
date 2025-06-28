"use client";
import { useRouter } from "next/navigation";
import "./index.css";
import { useEffect, useRef } from "react";
import { Rectangle, getShape } from "./canves-shapes";
export default () => {
  const router = useRouter();
  const colorRef = useRef<HTMLInputElement>(null);
  const cvsRef = useRef<HTMLCanvasElement>(null);

  const w = 800,
    h = 500;

  const shapes: Rectangle[] = [];

  useEffect(() => {
    const color = colorRef.current!;
    const cvs = cvsRef.current!;
    const ctx = cvs.getContext("2d")!;
    function init() {
      cvs.width = w * devicePixelRatio;
      cvs.height = h * devicePixelRatio;
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
    }
    init();

    cvs.onmousedown = (e) => {
      const rect = cvs.getBoundingClientRect(); // 相对于视口的位置
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const shape = getShape(shapes, x, y);
      if (shape) {
        // 拖动
        const { startX, startY, endX, endY } = shape;
        window.onmousemove = (e) => {
          const disX = e.clientX - rect.left - x;
          const disY = e.clientY - rect.top - y;
          shape.startX = startX + disX;
          shape.startY = startY + disY;
          shape.endX = endX + disX;
          shape.endY = endY + disY;
        };
      } else {
        // 新建
        const shape = new Rectangle(ctx, color.value, x, y, x, y); // 起始位置与开始位置在同一个点
        shapes.push(shape);
        window.onmousemove = (moveEvent) => {
          shape.endX = moveEvent.clientX - rect.left;
          shape.endY = moveEvent.clientY - rect.top;
        };
      }

      window.onmouseup = () => {
        window.onmousemove = null;
        window.onmouseup = null;
      };
    };
    window.onmouseup = () => {
      window.onmousemove = null;
      window.onmouseup = null;
    };
    function draw() {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      for (const s of shapes) {
        s.draw();
      }
    }
    draw();
  }, []);

  return (
    <div>
      <div
        className="cursor-pointer m-2 px-2 w-[50px] rounded-md hover:bg-[#e3f1fd]"
        onClick={() => router.back()}
      >
        返回
      </div>
      <div className="flex justify-center align-center items-center flex-col">
        <input className="my-2" type="color" ref={colorRef} />
        <canvas ref={cvsRef}></canvas>
      </div>
    </div>
  );
};
