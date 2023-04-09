import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import Script from "next/script";
import Typewriter from "typewriter-effect";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {

    let data = {"question" : question}
    const url = 'https://convai-backend-v2.onrender.com/answer_question';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': '0',
        },
        body: JSON.stringify(data),
    });
    
    const text = await response.json();
    setAnswer(text.answer)
    
    // console.log(text);
  };

  return (
    <>
      <section className="text-gray-400 h-screen bg-zinc-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
          <h1 className="text-4xl font-medium title-font mb-4 text-white">
            CONVAI AI TUTOR
          </h1>

          <div className="p-2 w-full">
            <div className="relative">
              {/* <h1>{answer}</h1> */}
              <Typewriter
                options={{
                  strings: `${answer}`,
                  autoStart: true,
                  loop: false,
                  delay: 20,
                }}
              />
            </div>
          </div>

          <div className="p-2 w-full">
            <div className="relative">
              <label for="message" className="leading-7 text-sm text-gray-400">
                What Can I help you with today?
              </label>
              <textarea
                id="message"
                name="message"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <button
            onClick={() => handleSubmit()}
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Get Answer
          </button>
          <div className="flex flex-col text-center w-full mt-6"></div>
          <div className="flex mx-auto flex-wrap mb-20 ">
            <Link
              href="/"
              className="sm:px-6 py-3 mr-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-800 inline-flex items-center leading-none border-indigo-500 text-white tracking-wider rounded-t"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Ask Anyting
            </Link>
            <Link
              href="/qna"
              className="sm:px-6 py-3 ml-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-800 inline-flex items-center leading-none border-indigo-500 text-white tracking-wider rounded-t"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Learn by Q/A
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
