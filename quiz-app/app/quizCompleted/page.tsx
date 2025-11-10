// "use client";
// import { useState, useEffect } from "react";
// import { AdminLayout } from "../(protected)/AdminLayout";
// import { Button } from "@/components/ui/button";

// export default function QuizzesPage() {
//   const [quiz, setQuiz] = useState([]); // асуултууд
//   const [currentQuestion, setCurrentQuestion] = useState(0); // одоогийн асуулт
//   const [score, setScore] = useState(0); // оноо
//   const [isCompleted, setIsCompleted] = useState(false); // дууссан эсэх
//   const [selectedAnswer, setSelectedAnswer] = useState(null);

//   // 🧩 Backend-ээс quiz авах
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       const response = await fetch("/api/quiz");
//       const data = await response.json();
//       setQuiz(data.quiz);
//     };
//     fetchQuiz();
//   }, []);

//   // 🧮 Хариулт шалгах функц
//   const handleAnswer = (answer) => {
//     const correct = quiz[currentQuestion].correctAnswer;
//     if (answer === correct) {
//       setScore(score + 1);
//     }

//     setSelectedAnswer(answer);

//     // 1 секундийн дараа дараагийн асуулт руу шилжих
//     setTimeout(() => {
//       if (currentQuestion + 1 < quiz.length) {
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedAnswer(null);
//       } else {
//         setIsCompleted(true);
//       }
//     }, 800);
//   };

//   // 🔁 Дахин эхлүүлэх
//   const restartQuiz = () => {
//     setScore(0);
//     setCurrentQuestion(0);
//     setIsCompleted(false);
//   };

//   // 🧾 Quiz дууссан үед
//   if (isCompleted) {
//     return (
//       <AdminLayout>
//         <div className="flex flex-col items-center justify-center h-screen">
//           <h1 className="text-3xl font-bold mb-2">✨ Quiz completed</h1>
//           <p className="text-lg mb-4">
//             Your score: {score} / {quiz.length}
//           </p>

//           {quiz.map((q, i) => (
//             <div key={i} className="text-left mb-3 border-b pb-2 w-[400px]">
//               <p className="font-semibold">
//                 {i + 1}. {q.question}
//               </p>
//               <p className="text-sm text-red-500">
//                 Your answer: {q.userAnswer || "Not answered"}
//               </p>
//               <p className="text-sm text-green-600">
//                 Correct: {q.correctAnswer}
//               </p>
//             </div>
//           ))}

//           <div className="flex gap-4 mt-5">
//             <Button onClick={restartQuiz} className="bg-white text-black border">
//               Restart quiz
//             </Button>
//             <Button className="bg-black text-white">Save and leave</Button>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   // 🧭 Quiz асуултууд харагдах хэсэг
//   if (quiz.length === 0) return <div>Loading quiz...</div>;

//   const question = quiz[currentQuestion];

//   return (
//     <AdminLayout>
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h2 className="text-xl font-semibold mb-4">
//           Question {currentQuestion + 1} / {quiz.length}
//         </h2>
//         <div className="w-[400px] border p-6 rounded-lg bg-white shadow">
//           <h3 className="font-semibold mb-4">{question.question}</h3>
//           <div className="flex flex-col gap-2">
//             {question.options.map((opt, i) => (
//               <Button
//                 key={i}
//                 disabled={selectedAnswer !== null}
//                 onClick={() => handleAnswer(opt)}
//                 className={`border ${
//                   selectedAnswer === opt
//                     ? opt === question.correctAnswer
//                       ? "bg-green-200"
//                       : "bg-red-200"
//                     : ""
//                 }`}
//               >
//                 {opt}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }
