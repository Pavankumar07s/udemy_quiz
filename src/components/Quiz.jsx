import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import Questions from "./Questions";
import Summary from "./Summary";


export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizCompleted) {
    return <Summary />;
  }

  return (
    <>
      <div id="quiz">
          <Questions
          key={activeQuestionIndex}
          questionText={QUESTIONS[activeQuestionIndex].text}
          answers={QUESTIONS[activeQuestionIndex].answers}
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}/>
        </div>
    </>
  );
}
