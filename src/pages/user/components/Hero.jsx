import React from 'react'
import vegi_basket from '../../assets/vegi_basket.png'
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate();
  return (
    <div>
         <div className='flex flex-col-reverse justify-between items-start mx-auto px-4 py-8 md:mx-12 md:px-16 md:flex-row max-h-[80vh] '>
            <div className='pt-8'> 
                <div className=' my-5 text-6xl md:text-7xl font-bold '>
                 <h1 className='text-primary mb-5 '>Fresh is</h1>
                 <h1 className='text-primary mb-8'>Our Passion</h1>
                </div>  
                <button className='py-3 px-10 rounded-full bg-primary text-white font-semibold' onClick={()=>navigate('/products')}>Shop Now</button>    
            </div>
            
            <div className=''>
                <img src={vegi_basket} alt='/' className='max-h-[450px]  '></img>
            </div>
        </div>
    </div>
  )
}

export default Hero