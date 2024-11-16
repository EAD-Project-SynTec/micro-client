import { fruits, vegetable } from '@/data/main-category-data'
import React from 'react'
const CategoryCard = ({ category }) => {
    return (
        <div className='flex flex-wrap gap-8 justify-start'>
            {category == 'vegitables' && vegetable.map((vegetable, index) => (
                <div key={index} className='grid grid-cols-3 items-start bg-gray-50  rounded-lg shadow-lg  max-w-xs'>
                    <div className=' '>
                        <img src={vegetable.imageUrl} alt={vegetable.name}
                            className=' rounded-xl py-2 h-[110px]' />
                    </div>
                    <div className=' col-span-2'>
                        <h1 className='text-lg font-semibold mt-4 mx-auto px-8'>{vegetable.name}</h1>
                    </div>
                </div>
            ))}
            {category == 'fruits' && fruits.map((fruit, index) => (
                <div key={index} className='grid grid-cols-3 items-start bg-gray-50  rounded-lg shadow-lg max-w-xs'>
                    <div className=' '>
                        <img src={fruit.imageUrl} alt={fruit.name}
                            className=' rounded-xl py-2 h-[110px]' />
                    </div>
                    <div className=' col-span-2'>
                        <h1 className='text-lg font-semibold mt-4 my-auto mx-auto px-8'>{fruit.name}</h1>
                    </div>
                </div>
            ))}


        </div>

    )
}

export default CategoryCard