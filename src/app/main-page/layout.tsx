import SideNav from "./sidenav";

export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      <SideNav />
      <div className="flex-grow mt-[68px] ">{children}</div>
    </div>
  );
}
