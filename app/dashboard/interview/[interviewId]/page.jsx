"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const Interview = ({params}) => {

  const [interviewData,setInterviewData]=useState();
  const [webCamEnabled,setWebCamEnabled]=useState(false);
  useEffect(()=>{
    GetInterviewDetails()
  },[])

  const GetInterviewDetails=async()=>{
    const result=await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interviewId))

    setInterviewData(result[0])
    
  }
  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Let's get started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        
        <div className='flex flex-col my-5'>
          <div className='flex flex-col p-5  rounded-lg border gap-5'>
            <h2 className='text-lg'>
            <strong>Job Role/Job Position:&nbsp;</strong>
            {interviewData && interviewData.jobPosition.replace(/'/g, '&apos;')}
          </h2>
          <h2 className='text-lg'>
            <strong>Job Description/Tech Stack:&nbsp;</strong>
            {interviewData && interviewData.jobDesc.replace(/'/g, '&apos;')}
          </h2>
          <h2 className='text-lg'>
            <strong>Years of Experience:&nbsp;</strong>
            {interviewData && interviewData.jobExperience.replace(/'/g, '&apos;')}
          </h2>

          </div>
          <div className='p-5 border rounded-lg border-red-500 bg-red-700'>
            <h2 className='flex gap-2 items-center text-yellow-400'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-3 text-green-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        <div className='flex justify-center flex-col'>
        {
          webCamEnabled? <Webcam
            onUserMedia={()=>setWebCamEnabled(true)}
            onUserMediaError={()=>setWebCamEnabled(false)}

            style={{
              height:300,
              width:300,
            }}
          />
          :
          <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
            <Button onClick={()=>setWebCamEnabled(true)} className=''>Enable Web Cam and Microphone </Button>
          </>
        }

        </div>
      
      </div>
      <div className='flex justify-end items-end mt-4'>
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className='bg-indigo-600'>Start Interview</Button>
        </Link>
        
      </div>
      
    </div>
  )
}

export default Interview
