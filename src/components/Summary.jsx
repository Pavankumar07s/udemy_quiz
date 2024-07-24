import TROPHY from "../assets/quiz-complete.png";
export default function Summary(){
    return <>
        <div id="summary">
        <img src={TROPHY} alt="" />
        <h2>Quiz completed</h2>
      </div>
    </>
}