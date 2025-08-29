import React from 'react'
import Image from 'next/image'
import Pfp from '@/public/pfp.jpg'
    
    const hero = () => {
      return (
        <div className=' min-h-8xl max-w-6xl mx-auto flex mt-40 gap-10 items-center'>
            <section>
                <Image
                src={Pfp}
                width={200}
                height={200}
                className='rounded-full'
                
                />
                

            </section>
            <section>
                <div>
                    <h1 className='text-5xl font-bold'>Abror</h1>
                    <p className='text-2xl text-gray-400'>Frontend Developer at Cognilabs</p>
                </div>
            </section>
          
        </div>
      )
    }
    
    export default hero
    