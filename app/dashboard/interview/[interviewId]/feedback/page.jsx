"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



const Feedback = ({ params }) => {
  
  const [feedbackList,setFeedbackList]=useState([])
  const router=useRouter()

  useEffect(() => {
    GetFeedback();
  }, []) // Including params in the dependency array to ensure it runs if params change

  const GetFeedback = async () => {
    


      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId)) 
        .orderBy(UserAnswer.id)
        setFeedbackList(result)
        

  }

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-red-600'>Congratulations!!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-sm text-green-800'>Find below interview question with correct answer, Also your answer and feedback for improvement</h2>
      {
        feedbackList && feedbackList.map((item,index)=>(
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-yellow-400 flex justify-between rounded-lg my-2 text-left gap-7 w-full'>
            {item.question} <ChevronsUpDown className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-900 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='text-yellow-300 bg-red-600 p-2 border rounded-lg text-sm'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='text-yellow-300 bg-green-600 p-2 border rounded-lg text-sm'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className='text-yellow-300 bg-blue-600 p-2 border rounded-lg text-sm'><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
              
            </CollapsibleContent>
          </Collapsible>

        ))
      }
      <Button className='bg-red-600 mt-5' onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
