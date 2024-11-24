import { Card } from '@material-tailwind/react'
import React from 'react'
import { CardPlacehoderSkeleton } from './CardPlacehoderSkeleton'

const LoadingProducts = () => {
  return (
    <div className='flex flex-wrap gap-6'>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
        <CardPlacehoderSkeleton/>
    </div>
  )
}

export default LoadingProducts