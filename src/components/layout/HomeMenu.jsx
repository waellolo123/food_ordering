import SectionHeader from "./SectionHeader";
import MenuItem from "./menu/MenuItem";


const HomeMenu = () => {
  return (
    <section className="flex flex-col items-center justify-center">
    <div className="">

    </div>
    <div className="mt-10">
      <div className="text-center">
        <SectionHeader subHeader={"Check out"} mainHeader={"Menu"}/>
      </div>
    </div>
    <div className="grid grid-cols-1 mx-auto  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
    <MenuItem />
    <MenuItem />
    <MenuItem />
    <MenuItem />
    </div>
    </section>
  )
}

export default HomeMenu;

