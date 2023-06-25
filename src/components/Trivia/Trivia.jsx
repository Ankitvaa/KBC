import { useEffect, useState } from "react";
import play from "../../sounds/play.mp3";
import correct from "../../sounds/correct.mp3";
import wrong from "../../sounds/wrong.mp3";
import "./trivia.css";
import useSound from "use-sound";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classNames, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay]);
  useEffect(() => {
    setQuestions(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (ans) => {
    setSelectedAnswer(ans);
    setClassName("answer active ");
    delay(3000, () =>
      setClassName(ans.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (ans.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer()
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{questions?.question}</div>
      <div className="answers">
        {questions?.answers.map((ans) => (
          <div
            // in Below name the classNames is from useStae line:7
            className={selectedAnswer === ans ? classNames : "answer"}
            onClick={() => {
              handleClick(ans);
            }}
          >
            {ans.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
