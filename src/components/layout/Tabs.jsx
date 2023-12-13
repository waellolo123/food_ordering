"use client";
import Link from "next/link";
import clsx from 'clsx';
import { useState } from "react";
import { usePathname } from "next/navigation";

const Tabs = ({isAdmin}) => {
  const path = usePathname();
  const [active, setActive] = useState(false);

  return (
           <div className="flex flex-col items-center gap-4">
             <h1 className="text-green-500 font-semibold">Admin</h1>
           <div className="flex items-center gap-2 mb-2">
              <Link href="/profile" className={clsx("shadow-md py-2 px-4 rounded-full text-sm", path === "/profile" ? "bg-primary text-white" : "bg-white text-slate-500")}>Profile</Link>
              <Link href="/categories" className={clsx("shadow-md py-2 px-4 rounded-full text-sm", path === "/categories" ? "bg-primary text-white" : "bg-white text-slate-500")}>Categories</Link>
              <Link href="/menu-items" className={clsx("shadow-md py-2 px-4 rounded-full text-sm", path === "/menu-itmes" ? "bg-primary text-white" : "bg-white text-slate-500")}>Menu</Link>
              <Link href="/users" className={clsx("shadow-md py-2 px-4 rounded-full text-sm", path === "/users" ? "bg-primary text-white" : "bg-white text-slate-500")}>Users</Link>
           </div>
          </div>
  )
}

export default Tabs