import { useEffect, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia/Trivia";
import Timer from "./components/timer/Timer";
import Start from "./components/start/Start";
function App() {
  const [username, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];
  const moneypyramid = [
    { id: 1, amount: "$ 1000" },
    { id: 2, amount: "$ 2000" },
    { id: 3, amount: "$ 5000" },
    { id: 4, amount: "$ 10,000" },
    { id: 5, amount: "$ 20,000" },
    { id: 6, amount: "$ 40,000" },
    { id: 7, amount: "$ 50,000" },
    { id: 8, amount: "$ 1,00000" },
    { id: 9, amount: "$ 32,0000" },
    { id: 10, amount: "$ 6,0000" },
    { id: 11, amount: "$ 12,50000" },
    { id: 12, amount: "$ 25,00000" },
    { id: 13, amount: "$ 500,0000" },
    { id: 14, amount: "$ 1000,0000" },
  ].reverse();

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneypyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneypyramid, questionNumber]);

  return (
    <>
      <div className="app">
        {username ? (
          <>
            <div className="main">
              {stop ? (
                <h1 className="endText">You Earned {earned}</h1>
              ) : (
                <>
                  <div className="top">
                    <div className="timer">
                      <Timer
                        setStop={setStop}
                        questionNumber={questionNumber}
                      />
                    </div>
                  </div>
                  <div className="bottom">
                    <Trivia
                      data={data}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneypyramid.map((money) => (
                  <li
                    className={
                      questionNumber === money.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                  >
                    <span className="moneyListItemNumber">{money.id}</span>
                    <span className="moneyListItemAmount">{money.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <Start setUsername={setUserName} />
        )}
      </div>
    </>
  );
}

export default App;
