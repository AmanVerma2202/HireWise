"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { chatSession } from '@/utils/GeminiAIModals'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { Mic } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

const RecordAnswerSection = ({mockInterviewQuestion,activeQuestionIndex,interviewData}) => {
    const [userAnswer,setUserAnswer]=useState('')
    const {user}=useUser()
    const [loading ,setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>{
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        })
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
            UpdateUserAnswer();
        }
      },[userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
            
            stopSpeechToText()
            
            // const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex].question+
            // ", User answer: "+userAnswer+", Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any in just 5-6 lines to imporve it in JSON format with rating field and feedback field"

            // const result = await chatSession.sendMessage(feedbackPrompt)
            // const mockJsonResp=await result.response.text();
            // const MockJson = mockJsonResp.replace('```json', '').replace('```', '').trim();
            // const parsedMockJson = JSON.parse(MockJson); // Parse the JSON string
            // console.log(parsedMockJson);
            // if (parsedMockJson) {
            //     const resp = await db.insert(UserAnswer).values({
            //         mockIdRef:interviewData?.mockId ,
            //         question:mockInterviewQuestion[activeQuestionIndex].question,
            //         correctAns:mockInterviewQuestion[activeQuestionIndex].answer,
            //         userEmail:userAnswer,
            //         feedback:parsedMockJson?.feedback,
            //         rating:parsedMockJson?.rating,
            //         userEmail:user?.primaryEmailAddress?.emailAddress,
            //         createdAt:moment().format('DD-MM-YYYY')
                    
            //     });
          
                
            //     if(resp){
                  
            //       toast("User answer recored successfully")
            //     }
            //     setUserAnswer('')
            //   } 
            //   setLoading(false)
              
            
        }else{ 
            startSpeechToText()
        }
      }

      const UpdateUserAnswer=async()=>{
        setLoading(true)
        const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex].question+
            ", User answer: "+userAnswer+", Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any in just 5-6 lines to imporve it in JSON format with rating field and feedback field"

            const result = await chatSession.sendMessage(feedbackPrompt)
            const mockJsonResp=await result.response.text();
            const MockJson = mockJsonResp.replace('```json', '').replace('```', '').trim();
            const parsedMockJson = JSON.parse(MockJson); // Parse the JSON string
            console.log(parsedMockJson);
            if (parsedMockJson) {
                const resp = await db.insert(UserAnswer).values({
                    mockIdRef:interviewData?.mockId ,
                    question:mockInterviewQuestion[activeQuestionIndex].question,
                    correctAns:mockInterviewQuestion[activeQuestionIndex].answer,
                    userAns:userAnswer,
                    feedback:parsedMockJson?.feedback,
                    rating:parsedMockJson?.rating,
                    userEmail:user?.primaryEmailAddress?.emailAddress,
                    createdAt:moment().format('DD-MM-YYYY')
                    
                });
          
                
                if(resp){
                  
                  toast("User answer recored successfully")
                  setUserAnswer('')
                  setResults([])
                }
                
              } 
              setLoading(false)
      }


      console.log(userAnswer)
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-10 justify-center items-center bg-secondary rounded-lg  p-5'>
            <Image src={'/webcam.png'} width={200} height={200} className='absolute' alt='image'/>
            <Webcam
                style={{
                    height:300,
                    width:'100%',
                    zIndex:10,
                    color:'#B0C4DE',

                }}
            />
        </div>
        <Button disable={loading} className="my-10 bg-indigo-600"
        onClick={StartStopRecording}
        >
            {
                isRecording?
                <h2 className='text-white flex gap-2 '>
                    <Mic/> Stop Recording
                </h2>:
                'Record Answer'
            }
        </Button>
        
    </div>
  )
}

export default RecordAnswerSection