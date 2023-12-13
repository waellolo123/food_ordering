"use client";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiImageSquareBold } from "react-icons/pi";
import { useEdgeStore } from "../../../lib/edgeStore";
import {toast} from "react-hot-toast";
import Link from "next/link";

import Tabs from "@/components/layout/Tabs";


const ProfilePage = () => {
  const {edgestore} = useEdgeStore();
  const session = useSession();
  const {status} = session;
  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(''); 
  const [image, setImage] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [streetAdress, setStreetAdress] = useState(''); 
  const [postalCode, setPostalCode] = useState(''); 
  const [city, setCity] = useState(''); 
  const [country, setCountry] = useState(''); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(()=>{
    if(status === 'authenticated'){
      setUserName(session.data.user.name)
      setImage(session.data.user.image)
       fetch('/api/profile').then((response)=>{
        response.json().then((data)=>{
          setPhone(data.phone);
          setStreetAdress(data.streetAdress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
        })
      })
    }
  },[session, status])

  if(status === 'loading'){
    return 'loading...';
  }
  if(status === 'unauthenticated'){
    return redirect('/login');
  }

  // const userImage = session.data.user.image
  
  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();
    const savingPromise = new Promise(async(resolve, reject)=>{
      const response = await fetch('/api/profile',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:userName, image, streetAdress, phone, postalCode, city, country})
      })
     if(response.ok) 
     resolve() 
       else 
     reject()
    });

    toast.promise(savingPromise,{
      loading: "Updating profile info",
      success: "Profile updated!",
      error: "Failed to update profile"
    });

  // async function handleFileChange(e){
  //   const files = e.target.files;
  //   if(files?.length === 1){
  //     const data = new FormData;
  //     data.set('file', files[0]);
  //     await fetch('/api/upload', {
  //       method: 'POST',
  //      body: data,
  //      headers: {'Content-Type': 'multipart/form-data'}
  //     });
  //   }
  // }
}
  
  const uploadImage =  async (e) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
        },
      });  
      setImage(res.url);
      toast.success("image uploaded");
    }};


    return (
    <section className="mt-8">
      <div className="w-[350px] md:w-[500px] max-w-xl mx-auto mt-10">
      <h1 className="text-center text-primary text-4xl ">Profile</h1>
      <div className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center mt-4">
            <div className="relative">
             {image && (
               <Image src={image} width={150} height={150} alt="user image" className="rounded-full w-[100px] h-[100px] object-cover"/>
             )} 
            <label htmlFor="profileImg"><PiImageSquareBold className="absolute text-3xl top-[60px] left-[35px] text-primary cursor-pointer bg-white p-1 rounded-full"/></label>
            </div>
            <input type="file" id="profileImg" hidden  onChange={(e) => setFile(e.target.files?.[0])} />
            <button className="mt-4 text-sm py-1 px-3" type="button" onClick={uploadImage}>Change Avatar</button>
          </div>
          {isAdmin && (
            <>
            <Tabs isAdmin={isAdmin} />
            </>
            )}
          <form className="w-full grow" onSubmit={handleProfileInfoUpdate}>
            <label className="text-slate-400">First and Lastname</label>
            <input type="text" placeholder="First and lastname" className="mb-4 mt-1" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <label className="text-slate-400">Email</label> 
            <input type="email" value={session.data.user.email} className="bg-white border-none text-gray-400 mb-4 mt-1" disabled={true}/>
            <label className="text-slate-400">Phone Number</label> 
            <input type="tel" className="bg-white border-none text-gray-400 mb-4 mt-1" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <label className="text-slate-400">Street Adress</label> 
            <input type="text" className="bg-white border-none text-gray-400 mb-4 mt-1" placeholder="Street address" value={streetAdress} onChange={(e) => setStreetAdress(e.target.value)}/>
            <div className="flex items-center gap-3 mb-4">
            <div className="">
              <label className="text-slate-400">Cidy</label> 
              <input type="text" className="bg-white border-none text-gray-400 mt-1" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>  
            <div className="">
              <label className="text-slate-400">Postal Code</label> 
              <input type="text" className="bg-white border-none text-gray-400 mt-1" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
            </div>
            </div>
            <label className="text-slate-400">country</label> 
            <input type="text" className="bg-white border-none text-gray-400 mb-4 mt-1" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}/>
            <button type="submit">Save</button>
          </form>
      </div>
      </div>
    </section>
  )
}


export default ProfilePage;

