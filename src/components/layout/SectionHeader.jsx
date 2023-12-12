import React from 'react'

const SectionHeader = ({subHeader, mainHeader}) => {
  return (
    <div>
       <h3 className="uppercase text-gray-500 font-semibold">{subHeader}</h3>
        <h2 className="text-primary font-semibold text-4xl italic tracking-widest">{mainHeader}</h2>
    </div>
  )
}

export default SectionHeader