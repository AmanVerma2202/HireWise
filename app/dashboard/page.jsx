import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import IntreviewList from './_components/IntreviewList'

const Dashboard = () => {
  return (
    <div>
        <h2 className='font-bold text-2xl text-red-600'>Dashboard</h2>
        <h2 className='text-gray-500'>Create and start your AI Mock Interview </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview/>
        </div>
        <IntreviewList/>
    </div>
  )
}

export default Dashboard