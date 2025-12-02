import React from 'react'
import Shoes from './three-js/shoe'

const Hero = () => {
  return (
    <div className='grid grid-cols-3 justify-center items-center h-screen'>
        <div className='flex justify-center items-center h-full'>
            <video src="runner-hero.mp4" autoPlay loop muted className='w-full h-full object-cover rounded-r-4xl'>
            </video>
        </div>

        <div className='relative h-full col-span-2'>
              <h1 className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
                 text-4xl font-extrabold">
    Mi Zapato 3D
  </h1>
            <Shoes/>
        </div>
        
    </div>
  )
}

export default Hero