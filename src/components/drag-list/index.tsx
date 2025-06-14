import clsx from "clsx";
import { useEffect, useRef } from "react";

export default (props: { children: React.ReactNode; className: string }) => {
  const domIndex = useRef<number>(null);
  if (!props.children) return null;

  useEffect(() => {
    return () => {
      domIndex.current = null;
    };
  });

  return (
    <div
      className={clsx("w-full", props.className)}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const parent = target.parentElement;
        if (parent) {
          const index = Array.from(parent.children).indexOf(target);
          domIndex.current = index;
        }
      }}
      onDragEnd={(e) => {
        (e.target as HTMLDivElement).style.opacity = "1";
      }}
      onDragEnter={(e) => {
        const target = e.target as HTMLDivElement;
        if (!target.draggable) return;
        target.style.opacity = "0.5";
      }}
      onDragLeave={(e) => {
        (e.target as HTMLDivElement).style.opacity = "1";
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        //draggable属性为ture时，才能放置元素
        if (!target.draggable) return;
        target.style.opacity = "0.5";
        // 获取当前元素的父元素
        const parent = target.parentElement;
        // 查询当前元素是父元素的第几个子元素
        // 当前元素与父元素的domIndex个子元素互换
        if (parent) {
          const index = Array.from(parent.children).indexOf(target);
          if (domIndex.current !== null) {
            const tempNode = parent.children[domIndex.current].cloneNode(true);
            parent.children[domIndex.current].innerHTML =
              parent.children[index].innerHTML;
            parent.children[index].replaceWith(tempNode);
          }
        }
      }}
    >
      {props.children}
    </div>
  );
};
