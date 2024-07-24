import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";

export default function Quiz() {
 const shuffledAnswers =useRef()
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

  const shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.current.sort(() => Math.random() - 0.5);

  return (
    <>
      <div id="quiz">
        <QuestionTimer
          key={activeQuestionIndex}
          timeOut={10000}
          onTimeout={handleSkipAnswer}
        />
        <div id="question">
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => {
              let cssClass = "";
              const isSelected =
                userAnswers[userAnswers.length - 1] === answer;
              if (answerState === "answered" && isSelected) {
                cssClass = "selected";
              }
              if (
                (answerState === "correct" || answerState === "wrong") &&
                isSelected
              ) {
                cssClass = answerState;
              }
              return (
                <li key={answer} className="answer">
                  <button
                    onClick={() => handleSelectAnswer(answer)}
                    className={cssClass}
                  >
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
