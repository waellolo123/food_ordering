"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {signIn} from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setIsLoading(true);
    setError(false);

      await signIn('credentials', {email, password, callbackUrl:'/'});
      router.push("/");
      setIsLoading(false);
  }

  return (
    <section className="mt-10 w-full flex items-center flex-col justify-center">
      <h1 className="text-center text-primary text-4xl">Login</h1>
      <p className="text-slate-500 my-4">With Email and Password</p>
      <form className="w-[400px]  block max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" className="mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
        <input type="text" placeholder="Password" name="password" className="mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
        <button type="submit" disabled={isLoading}>{isLoading ? "Login Process..." : "Login"}</button>
        <div className="">
        <p className="text-slate-500 mt-4 text-center">Or with google</p>
         <button type="button" className="mt-4 flex items-center justify-center gap-3" onClick={() => signIn('google', {callbackUrl: '/'})}>
          Login with google
          <FcGoogle />
          </button> 
        </div>
      </form>
        <p className="text-slate-500 mt-4 text-center">Dont have an account? <Link href={"/register"}><span className="underline text-primary">Create Account</span></Link></p>
        {error && (<div>
          <p className="text-red-500 text-center font-bold mt-2">Failed to Login Please try again Later!</p>
        </div>)}
    </section>
  )
}

export default LoginPage;


