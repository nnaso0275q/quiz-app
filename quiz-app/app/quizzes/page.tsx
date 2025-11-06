"use client";
import { useEffect, useState } from "react";
import { AdminLayout } from "../(protected)/AdminLayout";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const summary = searchParams.get("summary") || "";

  const [quizzes, setQuizzes] = useState<
    { question: string; options: string[]; correctAnswer: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);

  const currentQuiz = quizzes[currentIndex];

  useEffect(() => {
    if (!summary) return;
    const fetchQuiz = async () => {
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ summary }),
        });
        const data = await res.json();
        setQuizzes(data.quiz); // API-с 5 асуулт ирнэ
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [summary]);

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
    setShowNext(true);
    if (option === currentQuiz.correctAnswer) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowNext(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="mx-50 my-[120px]">
        <div className="flex items-center w-[558px] justify-between">
          <div className="flex items-center gap-2 ">
            <img src="/Article.svg" alt="article" />
            <div className="font-semibold text-2xl">Quick test</div>
          </div>
          <div className="w-12 h-10 border rounded-md flex items-center justify-center">
            <img className="px-4 py-3" src="/x.svg" alt="close" />
          </div>
        </div>

        <div className="text-[#71717A] font-medium text-base w-[558px] mb-6">
          Take a quick test about your knowledge from your content
        </div>

        <div className="mt-6 w-[558px] border bg-white rounded-md h-fit p-6">
          {quizzes.length === 0 ? (
            <div className="text-gray-500">Loading quiz questions...</div>
          ) : currentIndex < quizzes.length ? (
            <div>
              <div className="font-semibold text-lg mb-4">
                {currentIndex + 1}. {currentQuiz.question}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentQuiz.options.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => handleAnswerClick(option)}
                    className={`border-2 rounded-md w-[243px] h-20 flex items-center px-4 cursor-pointer transition
                      ${
                        selectedAnswer === option
                          ? option === currentQuiz.correctAnswer
                          : "hover:bg-gray-100"
                      }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {showNext && (
                <div className="flex justify-end mt-6">
                  <Button onClick={handleNextQuestion}>Next</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-2xl font-semibold p-7">
              Your score: {score} / {quizzes.length}
              <div className="mt-7">
                {/*  */}
                <div></div>
                {/*  */}
              </div>
              <div className="mt-7 justify-between flex">
                <Button className="bg-white text-black border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 1.40662C11.0986 1.40681 12.7068 3.56929 13.4316 4.84705L14.0283 5.89978H11.1992C11.181 5.89957 11.166 5.88483 11.166 5.86658C11.166 5.84836 11.181 5.83358 11.1992 5.83337H13.8867L13.4932 5.09705C12.8509 3.89688 11.2581 1.47323 8 1.47302C4.02006 1.47302 1.47266 4.73535 1.47266 8.00037C1.47287 11.2653 4.02023 14.5267 8 14.5267C9.91506 14.5266 11.4973 13.7718 12.624 12.6254C13.2294 12.0095 13.704 11.2803 14.0273 10.4945C14.0344 10.4776 14.0533 10.4691 14.0703 10.476C14.0873 10.4829 14.0959 10.5029 14.0889 10.5199C13.7623 11.3135 13.2834 12.05 12.6719 12.6722C11.5331 13.8308 9.9337 14.593 8 14.5931C3.97859 14.5931 1.40646 11.2971 1.40625 8.00037C1.40625 4.70354 3.97842 1.40662 8 1.40662ZM14.3994 2.63318C14.4177 2.63318 14.4325 2.64812 14.4326 2.66638V5.86658C14.4326 5.88496 14.4178 5.89978 14.3994 5.89978H14.3662V2.66638C14.3664 2.64818 14.3812 2.63328 14.3994 2.63318Z"
                      fill="#09090B"
                      stroke="#18181B"
                    />
                  </svg>
                  Restart quiz
                </Button>
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M9.83333 12.5L5.16667 9.83333L0.5 12.5V1.83333C0.5 1.47971 0.640476 1.14057 0.890524 0.890524C1.14057 0.640476 1.47971 0.5 1.83333 0.5H8.5C8.85362 0.5 9.19276 0.640476 9.44281 0.890524C9.69286 1.14057 9.83333 1.47971 9.83333 1.83333V12.5Z"
                      stroke="#FAFAFA"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Save and leave
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
