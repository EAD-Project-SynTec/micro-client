import React,{useState} from 'react'
import TabAndTables from '../components/TabAndTables'

const MyOrders = () => {
  const [defaultTab, setDefaultTab] = useState('All');

  return (
    <div className="mt-12">
      <TabAndTables defaultTab={defaultTab}/>
    </div>
  )
}

export default MyOrders