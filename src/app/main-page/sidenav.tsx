import CscLogo from "@/components/csc-logo";
import { GlobeAltIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NavLinks from "./nav-links";
import { lusitana } from "@/components/fonts";
import Search from "./search";

export default function SideNav() {
  return (
    // <div className="flex h-full flex-col">
    <div className="flex grow  items-center gap-2  py-2 px-2  fixed top-0 right-0 left-0 z-20 bg-white">
      <Link
        className={`${lusitana.className} h-[48px] p-2 flex flex-row items-center leading-none  text-white  rounded-md bg-blue-600`}
        href="/main-page"
      >
        <GlobeAltIcon className="h-10 w-10 rotate-[15deg]" />
        <span className="text-[30px] mt-[4px]">CSC</span>
      </Link>
      <Search />
      <NavLinks />
      <Link href={"/auth-page"}>
        <ListBulletIcon className="w-[48px] rounded-md bg-gray-50 hover:bg-sky-100 hover:text-blue-600 " />
      </Link>
    </div>
    // </div>
  );
}
