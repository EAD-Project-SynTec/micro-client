import React,{useState} from 'react'
import Tab from './components/Tab';

export function MyOrders() {
  const [defaultTab, setDefaultTab] = useState('All');
  
  return (
    <div className="mt-12">
      <Tab defaultTab={defaultTab}/>
    </div>
           
  );
}

export default MyOrders;