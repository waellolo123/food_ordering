
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";

export default function Home() {
  return (
    <>

     <Hero />
     <HomeMenu />
     <section className="text-center my-16">
      <SectionHeader subHeader="Our Story" mainHeader="About Us"/>
      <p className="max-w-3xl mx-auto mt-4 text-gray-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni ut tempore, rerum labore, asperiores esse quidem inventore quo in odio odit. Fugiat inventore velit rem qui atque laborum doloremque magnam aperiam, sed similique dicta molestiae repudiandae eum nesciunt culpa? Labore?
      </p>
     </section>
     <section className="text-center mt-16">
      <SectionHeader subHeader={"Don\'t hesitate"} mainHeader={"Contact Us"} />
      <a href="tel:+4676399544809" className=" text-slate-500 text-2xl">tel:+4676399544809</a>
     </section>
     
    </>
  )
}

