import React from 'react'
import { Configurator, DashboardNavbar, Sidenav,} from '@/widgets/layout'
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Routing from '../route/Routing';
import { SideBar } from '../components/SideBar';

const CourierDashboard = () => {
  return (
    <div className='min-h-screen bg-blue-gray-50/50'>
        <SideBar/>

        <div className='p-4 xl:ml-80'>
            <DashboardNavbar/>
            <Configurator/>

            <Routing/>
            
        </div>

    </div>
  )
}

export default CourierDashboard