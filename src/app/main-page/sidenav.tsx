import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import CscLogo from "@/components/csc-logo";
import NavLinks from "./nav-links";

export default function AuthSideNav() {
  return (
    <div className="flex h-full flex-col py-4 px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
        href="/"
      >
        <div className=" text-white w-40">
          <CscLogo />
        </div>
      </Link>
      <div className="flex grow justify-between">
        <NavLinks />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center  gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 flex-none justify-start p-2 px-3">
            <PowerIcon className="w-6" />
            <div className="block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
