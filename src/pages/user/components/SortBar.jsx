import React, { useState } from 'react'

const sortList =[
    { value: '', label: 'All' },
    { value: 'asc', label: 'Price Low to High' },
    { value: 'desc', label: 'Price High to Low' },
]
const SortBar = ({handleSortedData}) => {

    const handleSortChange = (event) => {
        handleSortedData(event.target.value);
      };
    
  return (
    <div className=' flex justify-end mx-8 items-center gap-4 py-3'>
        <div className=' text-sm'>
            <p>Sort By:</p>
        </div>
         <select
                onChange={handleSortChange}
                className='overflow-y-scroll text-sm rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent  font-sans font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 bg-gray-50 focus:ring-blue-500 block p-2.5'
              >
                {sortList.map((v) => (
                      <option className='text-sm py-3' key={v.value} value={v.value}>{v.label}</option>
                    ))}
        </select>
    </div>
  )
}

export default SortBar