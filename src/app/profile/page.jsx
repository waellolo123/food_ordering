"use client";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiImageSquareBold } from "react-icons/pi";
import { useEdgeStore } from "../../../lib/edgeStore";
import {toast} from "react-hot-toast";



const ProfilePage = () => {
  const {edgestore} = useEdgeStore();

  const session = useSession();
  const {status} = session;
  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(''); 
  const [image, setImage] = useState(''); 

  useEffect(()=>{
    if(status === 'authenticated'){
      setUserName(session.data.user.name)
      setImage(session.data.user.image)
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
        body: JSON.stringify({name:userName, image})
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


export default ProfilePage;
