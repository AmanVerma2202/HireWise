"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModals'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'
  

const AddNewInterview = () => {
    const [openDialog,setOpenDialog]=useState(false);
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();

    const onSubmit=async(e)=>{
      setLoading(true);
      e.preventDefault();
      console.log(jobPosition,jobDesc,jobExperience);
      const InputPrompt="Job Position:"+jobPosition+", Job Description:"+jobDesc+", Years of Experience :"+jobExperience+". According to job position, job description & years of experience give us 5 actual standard interview questions with answer in JSON foramt. Give us question and answer field on JSON and do not add extra space character after JSON";
      try {
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonRaw = await result.response.text(); // Ensure you await the text conversion
        const MockJson = MockJsonRaw.replace('```json', '').replace('```', '').trim(); // Trim any whitespace
    
        const parsedMockJson = JSON.parse(MockJson); // Parse the JSON string
        console.log(parsedMockJson);
        setJsonResponse(parsedMockJson);
    
        // Storing inside the database
        if (parsedMockJson) {
          const resp = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jsonMockResp: MockJson,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
          }).returning({ mockId: MockInterview.mockId });
    
          console.log('inserted id: ', resp);
          if(resp){
            
            router.push('/dashboard/interview/'+resp[0]?.mockId)
          }
          
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error parsing or inserting JSON: ", error);
      }
      setLoading(false);
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-indigo-500 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDialog(true)}
        >
            <h2 className='text-lg text-center text-white'>+Add New</h2>
        </div>
        <Dialog open={openDialog} >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
              <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                <h2>Add Details about your job position/role/, job description and years of experience</h2>
                  
                  <div className='mt-7 my-3'>
                    <label>Job role/position</label>
                    <Input placeholder="Ex. MERN Stack Developer" required
                      onChange={(e)=>setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className='my-3'>
                    <label>Job Description/Tech Stack(In Short)</label>
                    <Textarea placeholder="Ex. React, Spring Boot, Nextjs, Nodejs, etc."
                      onChange={(e)=>setJobDesc(e.target.value)}
                    />
                  </div>

                  <div className='my-3'>
                    <label>Years of experience</label>
                    <Input placeholder="Ex. 3" max="30" type="number" required
                      onChange={(e)=>setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                    <Button type="button" variant="destructive" className="outline-none" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading} >
                      {
                        loading?
                        <>
                          <LoaderCircle className='animate-spin'/>Generating Interview
                        </>:'Start Interview'
                      }
                    </Button>
                </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview