"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionResponse from './_components/QuestionResponse'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);


  const GetInterviewDetails = async () => {
    try {
      console.log("Fetching interview details...");
  
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
  
      console.log("Database Result:", result); // Log raw data
  
      if (result.length > 0 && result[0]?.jsonMockResp) {
        console.log("Raw JSON Response:", result[0].jsonMockResp); // Log before parsing
  
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
  
        // Log parsed data
        console.log("Parsed Questions:", jsonMockResp);
  
        // Check if questions are valid
        if (Array.isArray(jsonMockResp) && jsonMockResp.length > 0) {
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
        } else {
          console.error("Invalid or empty questions array.");
        }
      } else {
        console.error("No valid data found for the given interview ID.");
      }
    } catch (error) {
      console.error("Error fetching or parsing interview details:", error);
    }
  };
  
  
  

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionResponse
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            className="bg-amber-500"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous question
          </Button>
        )}
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button
            className="bg-green-500"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button className="bg-red-700">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
