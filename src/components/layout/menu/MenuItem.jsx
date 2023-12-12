
const MenuItem = () => {
  return (
    
      <div className=" w-[300px] lg:w-[250px] bg-gray-100 p-4 rounded-lg text-center shadow hover:bg-white hover:shadow-lg transition">
        <img src="/assets/Eq_it-na_pizza-margherita_sep2005_sml.jpg" alt="pizza" />
        <h4 className="my-4 font-semibold text-2xl text-primary">Pepperoni Pizza</h4>
        <p className="text-gray-500 text-sm">Pepperoni pizza is a classic pizza variety that is enjoyed by many.</p>
        <button className="bg-primary border-0 text-white rounded-full px-4 py-2 mt-4">Add To Cart / $12</button>
      </div>

  )
}

export default MenuItem