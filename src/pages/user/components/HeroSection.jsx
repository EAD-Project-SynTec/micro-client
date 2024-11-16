import React from 'react'
import { Carousel } from "@material-tailwind/react";
import MainNav from './MainNav';
const HeroSection = () => {
    return (
        <div className='md:h-[80vh] w-auto md:px-12  overflow-hidden'>
        
            <Carousel className='rounded-lg overflow-y-hidden'>
                <img
                    src="https://syntecblobstorage.blob.core.windows.net/bussinescard/Card1 (1).png"
                    alt="image 1"
                    className=" w-auto object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </div>

    )
}

export default HeroSection