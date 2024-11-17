import React, { useState } from 'react';
import { Title } from '../../../seller/SellerDashboard/dashboard/forms/FormComponents';
import { fruits, vegetables } from '../../../data/product-type-data';

const Filterbar = ({ items, applyFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to apply filters and pass filtered data to parent component
  const handleApplyFilters = () => {
    console.log("---------------------------------------")
    let filteredData = items;
    console.log(filteredData)
    if (selectedCategory) {
      console.log(selectedCategory)
      filteredData = filteredData.filter(product => product.category === selectedCategory);
      console.log(filteredData)
    }
    applyFilters(filteredData);
    
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <div className='px-6 border-r border-gray-200'>
        <form>
          {/* Select category */}
          <div className=' mt-8'>
            <Title title="Select Category"></Title>
            <div className="w-full mt-4">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='overflow-y-scroll h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 bg-gray-50 focus:ring-blue-500 block p-2.5'
              >
                <option value="">All</option>
                {vegetables.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))}
                {fruits.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Apply filters button */}
          <button
            type='button'
  className="mt-8 bg-green-500 w-full rounded-md text-white py-2 text-sm hover:bg-green-600"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filterbar;
