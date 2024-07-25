import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
export default function Questions({
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSelectAnswer,
  onSkipAnswer,
}) {
  return (
    <>
      <QuestionTimer timeOut={10000} onTimeout={onSkipAnswer} />
      <div id="question">
        <h2>{questionText}</h2>
        <Answers
          answers={answers}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onSelect={onSelectAnswer}
        />
      </div>
    </>
  );
}
