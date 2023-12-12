"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {signIn} from "next-auth/react";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    try {
      await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
      });
      setIsLoading(false);
      setUserCreated(true);
      router.refresh();
    } catch (err) {
      setError(true)
    }
  }

  return (
    <section className="mt-10 w-full flex items-center flex-col justify-center">
      <h1 className="text-center text-primary text-4xl">Register</h1>
      {userCreated && (
          <div className="text-gray-500 mt-4">User Profile Created Successfully You can<Link href={"/login"} className="underline text-primary"> login to your profile</Link> </div>
      )}
      <p className="text-slate-500 mt-4">With Email and Password</p>
      <form className="w-[400px]  block max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
        <button type="submit" disabled={isLoading}>{isLoading ? "Creating user..." : "Register"}</button>
        <div className="">
        <p className="text-slate-500 mt-4 text-center">Or with google</p>
         <button type="button" className="mt-4 flex items-center justify-center gap-3" onClick={() => signIn('google', {callbackUrl: '/'})}>
          Login with google
          <FcGoogle />
          </button> 
        </div>
      </form>
        <p className="text-slate-500 mt-4 text-center">Already have an account? <Link href={"/login"}><span className="underline text-primary">Login</span></Link></p>
        {error && (<div>
          <p className="text-red-500 text-center font-bold mt-2">Failed to create Please try again Later!</p>
        </div>)}
    </section>
  )
}

export default RegisterPage;


