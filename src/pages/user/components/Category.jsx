
import React, { useState } from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import CategoryCard from './CategoryCard';
 
const Category = () => {
  const [category,setCategory]=useState('');
 
  const setTabvalue = (value) => {
    setCategory(value);
    console.log(value);
  }
  const data = [
    {
      label: "Vegitables",
      value: "vegitables",
      desc: <CategoryCard category={category} />,
    },
    {
      label: "Fruits",
      value: "fruits",
      desc: <CategoryCard category={category} />,
    },
    
  ];
  return (
    <div className='mt-12 mx-16 rounded-3xl bg-white border border-gray-300'>
      <div className=''>
      <Tabs value="html" className="w-full">
      <TabsHeader
        className=" bg-white text-white font-semibold rounded-t-3xl"
        indicatorProps={{
          className: "rounded-t-3xl bg-primary text-white py-4 m-0 ",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} defaultChecked={true} onClick={()=>setTabvalue(value)} activeClassName='text-white'>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
      </div>

      <div>

      </div>
    </div>
  )
}


export default Category
