import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions";
import Questions from "./Questions";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  }, []);

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
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </>
  );
}
