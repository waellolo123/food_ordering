"use client";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiImageSquareBold } from "react-icons/pi";


const ProfilePage = () => {
  const session = useSession();
  const {status} = session;
  const [userName, setUserName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    if(status === 'authenticated'){
      setUserName(session.data.user.name)
    }
  },[session, status])

  if(status === 'loading'){
    return 'loading...';
  }
  if(status === 'unauthenticated'){
    return redirect('/login');
  }

  const userImage = session.data.user.image

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/profile',{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name:userName})
    })
    if(e.target.userName === userName) {
      
    }
    if(response.ok){
      setSaved(true);
    }
    setTimeout(()=>{
      setSaved(false)
    },3000)
    
  }

  async function handleFileChange(e){
    const files = e.target.files;
    if(files?.length === 1){
      const data = new FormData;
      data.set('files', files[0]);
     await fetch('/api/upload', {
       method: 'POST',
       body: null,
       headers: {'Content-Type': 'multipart:form-data'}
      });
    }
  }

  return (
    <section className="mt-8">
      <div className="w-[350px] md:w-[500px] max-w-xl mx-auto mt-10">
      <h1 className="text-center text-primary text-4xl ">Profile</h1>
      {saved && (
        <h2 className="text-center text-green-700 bg-green-200 p-4 mt-4 mb-4 rounded-lg">Profile Saved Successfully!</h2>
      )}
      <div className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center mt-4">
            <div className="relative">
            <Image src={userImage} width={80} height={80} alt="user image" className="rounded-full"/>
            <label htmlFor="profileImg"><PiImageSquareBold className="absolute text-3xl top-[40px] left-[25px] text-primary cursor-pointer bg-white p-1 rounded-full"/></label>
            </div>
            <input type="file" id="profileImg" hidden onChange={handleFileChange}/>
            <button className="mt-4 text-sm py-1 px-3" type="button">Change Avatar</button>
          </div>
          <form className="w-full grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="First and lastname" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <input type="email" value={session.data.user.email} className="bg-white border-none text-gray-400 " disabled/>
            <button type="submit">Save</button>
          </form>
      </div>
      </div>
    </section>
  )
}

export default ProfilePage

