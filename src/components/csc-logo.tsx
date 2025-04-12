import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/components/fonts";

export default function CscLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[30px] mt-[16px]">CSC</p>
    </div>
  );
}
