import React from "react";
import Link from "next/link";
import { useState } from "react";
import Typewriter from "typewriter-effect";
const QNA = () => {
  // const [question, setQuestion] = useState("");
  // const [generatedAnswers, setGeneratedAnswers] = useState(null);
  const [answer, setAnswer] = useState("");
  const [topic, setTopic] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [questionAnswered, setQuestionAnswered] = useState({});
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [riterate, setRiterate] = useState("");

  const handleAnswerSubmission = async () => {
    let currentQuestion = "";
    let tempArray = Object.entries(questionAnswered);
    for (let i = 0; i < tempArray.length; i++) {
      if (!tempArray[i][1]) {
        currentQuestion = tempArray[i][0];
        break;
      }
    }
    const url = "https://convai-backend-v2.onrender.com/check_answers";
    let data = { question: currentQuestion, answer: answer };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "0",
      },
      body: JSON.stringify(data),
    });

    const text = await response.json();
    console.log(currentQuestion);
    let rating = text.rating;
    let tempQuestionAnswered = questionAnswered;
    if (rating > 5) {
      setMessage(
        `Your previous answer was satisfactory please answer the next question.  Rating :- ${rating}/10`
      );
      tempQuestionAnswered[currentQuestion] = true;
    }
    if (rating <= 5) {
      setMessage(`Try Again : ( Rating :- ${rating}/10`);
    }
    setQuestionAnswered(tempQuestionAnswered);

    let tempChat = chat + currentQuestion + answer;
    setChat(tempChat);
    // console.log(text.rating);
    // console.log(questionAnswered);
  };

  const handleTopicSubmission = async () => {
    let data = { subtopic: topic };
    const url = "https://convai-backend-v2.onrender.com/ask_questions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "0",
      },
      body: JSON.stringify(data),
    });

    const questionsArray = await response.json();
    let tempDict = {};
    let tempArray = [];
    questionsArray.questions.forEach((element) => {
      if (element.length > 6) {
        tempArray.push(element);
        tempDict[element] = false;
      }
    });
    setGeneratedQuestions(tempArray);
    setQuestionAnswered(tempDict);
    // console.log(generatedQuestions);
    // console.log(questionAnswered);
  };

  const handleSummarise = async () => {
    let data = { subtopics: chat };
    const url = "https://convai-backend-v2.onrender.com/summarize_topic";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "0",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    setSummary(res.summary);
  };
  const handleRiterate = async () => {
    let data = { topic: answer };
    const url = "https://convai-backend-v2.onrender.com/reiterate_topic";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "0",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    setRiterate(res.overview);
  };

  return (
    <>
      <section class="text-gray-400 h-screen bg-zinc-900 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap flex-col">
          <h1 class="text-4xl font-medium title-font mb-4 text-white">
            CONVAI AI TUTOR
          </h1>

          <div class="p-2 w-full">
            <div class="relative">
              {generatedQuestions != null ? (
                generatedQuestions.map((question) => {
                  if (questionAnswered[question]) {
                    return;
                  }
                  return (
                    <Typewriter
                      options={{
                        strings: question,
                        autoStart: true,
                        loop: false,
                        delay: 20,
                      }}
                      key={question}
                    />
                  );
                })
              ) : (
                <Typewriter
                  options={{
                    strings: "Processing...",
                    autoStart: true,
                    loop: true,
                    delay: 20,
                    key: question
                  }}
                />
              )}
            </div>
          </div>

          <div class="p-2 w-full">
            <div class="relative">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-400">
                  Please Enter the name of the topic you want to learn?
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                  class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />

                <button
                  onClick={() => handleTopicSubmission()}
                  class="flex mx-auto mt-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Enter Topic
                </button>

                <div class="p-2 w-full">
                  <div class="relative">
                    <Typewriter
                      options={{
                        strings: message,
                        autoStart: true,
                        loop: false,
                        delay: 20,
                      }}
                    />
                  </div>
                </div>
              </div>

              <label for="message" class="leading-7 text-sm text-gray-400">
                Enter your answers here (Please enter answer to one question at
                a time)
              </label>
              <textarea
                id="message"
                name="message"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <button
            onClick={() => handleAnswerSubmission()}
            class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Answer
          </button>
          <div class="p-2 w-full">
            <div class="relative">
              <Typewriter
                options={{
                  strings: summary,
                  autoStart: true,
                  loop: false,
                  delay: 20,
                }}
              />
            </div>
          </div>
          <button
            onClick={() => handleSummarise()}
            class="lex mx-auto text-white bg-indigo-500 border-0 my-4 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Summarise
          </button>

          <div class="p-2 w-full">
            <div class="relative">
              <Typewriter
                options={{
                  strings: riterate,
                  autoStart: true,
                  loop: false,
                  delay: 20,
                }}
              />
            </div>
          </div>

          <button
            onClick={() => handleRiterate()}
            class="lex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Reiterate
          </button>
          <div class="flex flex-col text-center w-full mt-6"></div>
          <div class="flex mx-auto flex-wrap mb-20 ">
            <Link
              href="/"
              class="sm:px-6 py-3 mr-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-800 inline-flex items-center leading-none border-indigo-500 text-white tracking-wider rounded-t"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Ask Anyting
            </Link>
            <Link
              href="/qna"
              class="sm:px-6 py-3 ml-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-800 inline-flex items-center leading-none border-indigo-500 text-white tracking-wider rounded-t"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5 mr-3"
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
};

export default QNA;
