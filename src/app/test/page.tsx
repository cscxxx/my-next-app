import clsx from "clsx";

export default () => {
  return (
    <div>
      <div
        className={clsx("grid grid-cols-5", {
          "sm:grid-cols-1": true,
          "md:grid-cols-2": true,
          "lg:grid-cols-3": true,
          "xl:grid-cols-4": true,
          "xxl:grid-cols-5": true,
        })}
      >
        <div className=" w-[100%] h-[100px] bg-slate-400">1</div>
        <div className=" w-[100%] h-[100px] bg-purple-600">2</div>
        <div className=" w-[100%] h-[100px] bg-red-400">3</div>
        <div className=" w-[100%] h-[100px] bg-teal-300 ">4</div>
        <div className=" w-[100%] h-[100px] bg-lime-500">5</div>
      </div>
    </div>
  );
};
