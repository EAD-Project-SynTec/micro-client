import React from 'react'

export default function FormLabel({children}) {
  return (
    <div className="w-full p-3 md:w-1/3">
        <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
            {children}
        </p>
    </div>
  )
}
