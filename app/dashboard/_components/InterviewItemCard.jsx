import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({interview}) => {
    const router=useRouter()
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onfeedback=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-red-600 '>{interview?.jobPosition}</h2>
        <h2 className='text-blue-700 text-sm'>Years of Experience:{interview?.jobExperience}</h2>
        <h2 className='text-green-800 text-xs' >Created At: {interview?.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>

                <Button size="sm" onClick={onfeedback} className='bg-yellow-500 w-full'>Feedback</Button>
        
                <Button size="sm" onClick={onStart} className='bg-yellow-500 w-full'>ReStart</Button>
            
        </div>
    </div>
  )
}

export default InterviewItemCard