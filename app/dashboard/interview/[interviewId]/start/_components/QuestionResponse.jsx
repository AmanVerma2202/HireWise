


import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';


const QuestionResponse = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  console.log("Mock Interview Questions:", mockInterviewQuestion);

  const textToSpeach = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech');
    }
  };

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return <div>No questions available.</div>; // Render this if there are no questions
  }

  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <div key={index}>
            <h2
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
                ${activeQuestionIndex === index && '!bg-indigo-500 text-white'}`}
            >
              Question {index + 1}
            </h2>
          </div>
        ))}
      </div>
      {mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex] && (
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex].question}
        </h2>
      )}
      <Volume2 className="cursor-pointer text-green-500" onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex].question)} />
      <div className="border rounded-lg p-5 bg-red-700 mt-20">
        <h2 className="flex gap-2 items-center text-yellow-400">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-green-500">
          {process.env.NEXT_PUBLIC_INTERVIEW}
        </h2>
      </div>
    </div>
  );
};

export default QuestionResponse;

