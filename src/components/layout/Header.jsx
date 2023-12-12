"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {

  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const user = userData?.name || userData?.email;
  const userImage = session?.data?.user?.image

  return (
    <header className="flex mx-auto items-center justify-between  border-b pb-3 px-3 shadow-md">
    <Link href={"/"} className="text-primary font-semibold text-2xl">Nappoli</Link>
    <nav className="flex gap-8 text-gray-400 items-center">
      <Link href={"/"} className="hover:text-primary transition">Home</Link>
      <Link href={"/menu"} className="hover:text-primary transition">Menu</Link>
      <Link href={"/about"} className="hover:text-primary transition">About</Link>
      <Link href={"/contact"} className="hover:text-primary transition">Contact</Link>
    </nav>
    <nav className="flex items-center gap-3">
      {status === 'authenticated' ? (
        <div className="flex items-center gap-2">
        <Link href={"/profile"} className="flex flex-col items-center gap-1 ">
          <Image src={userImage} width={100} height={100} alt="user image" className="w-[40px] h-[40px] rounded-full border border-primary border-1 object-cover"/>
          <p className="w-[100px] text-center text-slate-500 text-sm underline">{user}</p>
        </Link>
        <button onClick={()=>signOut()} className="bg-primary border-0 text-white px-5 py-1 rounded-full hover:bg-primary/90 transition">Logout</button>
        </div>
      ) : (
        <>
        <Link href={"/login"} className="bg-primary border-0 text-white px-5 py-1 rounded-full hover:bg-primary/90 transition">Login</Link>
        <Link href={"/register"} className="bg-primary border-0 text-white px-5 py-1 rounded-full hover:bg-primary/90 transition">Register</Link>
        </>
      )}
    </nav>
   </header>
  )
}

export default Header;

