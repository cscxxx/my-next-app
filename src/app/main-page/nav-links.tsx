"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const ReactIcon = () => {
  return <Image src="/react-icon.svg" alt="" width={30} height={30} />;
};

const links = [
  { name: "test1", href: "/main-page/test1", icon: ReactIcon },
  {
    name: "test2",
    href: "/main-page/test2",
    icon: DocumentDuplicateIcon,
  },
  // {
  //   name: "Invoices",
  //   href: "/dashboard/invoices",
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600  p-2 px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            {/* <p className="hidden md:block">{link.name}</p> */}
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
