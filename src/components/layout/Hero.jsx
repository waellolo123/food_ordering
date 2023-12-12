import Image from "next/image";
import { GiFullPizza } from "react-icons/gi";

const Hero = () => {
  return (
    <section className="mt-10 grid grid-cols-2">
      <div className="py-8">
      <h1 className="text-4xl font-semibold text-slate-400">Pizza perfection, every time</h1>
      <p className="mt-4 text-gray-500"><span className="text-primary font-semibold text-2xl">Pizza</span> is a dish that has captured the hearts of millions around the world. <br />It’s a food that is both comforting and exciting, with endless possibilities for toppings and crusts.</p>
      <div className="flex gap-4 mt-4">
        <button className="bg-primary text-white px-8 py-2 border-0 rounded-full">Order Now</button>
        <button className=" text-primary border border-primary px-8 py-2 rounded-full">Learn More</button>
      </div>
      </div>
      <div className="flex items-center justify-center">
       {/* <Image 
       src={'/assets/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg'} 
       fill objectFit="contain" alt="pizza image"/> */}
       <GiFullPizza size={200} className=" text-primary"/>
      </div>
    </section>
  )
}

export default Hero
