import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(0);
  const [Message, setMessage] = useState({
    content: "",
    type: "",
  });
  const [score, setScore] = useState(0);

  const getData = async () => {
    const response = await fetch("https://jservice.io/api/random");
    const data = await response.json();
    setData(data);
    setMessage({
      ...Message,
      ["content"]: data[0].question,
      ["type"]: "Question",
    });
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  const handleClick = async (e) => {
    getData();
  };

  const Reveal = (e) => {
    setMessage({
      ...Message,
      ["content"]: data[0].answer,
      ["type"]: "Answer",
    });
  };

  const RevealQuestion = (e) => {
    setMessage({
      ...Message,
      ["content"]: data[0].question,
      ["type"]: "Question",
    });
  };

  // e.target.content = "Click here to reveal the question ";

  ///////////////////
  ////////////////////
  const Decrease = () => {
    setScore(score - data[0].value);
  };
  const Increase = () => {
    setScore(score + data[0].value);
  };
  const Rest = () => {
    setScore(0);
  };
  ///////////////////////
  ////////////////////
  return (
    <div className="App">
      <div className="main">
        <h1 className="title">Welcome to Jeopardy!</h1>
        <h1 className="score">
          Score : <span style={{ color: "white" }}>{score}</span>
        </h1>
        <button onClick={Decrease} className="decrease">
          Decrease
        </button>
        <button onClick={Increase} className="increase">
          Increase
        </button>
        <button onClick={Rest} className="rest">
          Reset
        </button>
        <br />
        <h1 className="score"> Let's play !</h1>

        {/************************************* */}
        {/************************************* */}
        {/************************************* */}
        {/* the questions starts from here  */}
        <button onClick={handleClick} className="get-question">
          Get Question
        </button>

        <h1 className="score">
          Category :
          <span style={{ color: "white" }}>
            {data == 0 ? <h1></h1> : data[0].category.title}
          </span>
        </h1>
        <h1 className="score">
          Points :
          <span style={{ color: "white" }}>
            {data == 0 ? <h1></h1> : data[0].value}
          </span>
        </h1>

        {Message["content"] == "" ? (
          <h1>click Get Question to display Question</h1>
        ) : (
          <h1>
            <span style={{ color: "yellow" }}> {Message["type"]} :</span>
            {Message["content"]}
          </h1>
        )}

        {Message["type"] == "Question" ? (
          <button onClick={Reveal} className="reveal">
            click to reveal the answer
          </button>
        ) : (
          <button onClick={RevealQuestion} className="reveal">
            click to reveal the Question
          </button>
        )}

        <button
          onClick={Reveal}
          className="reveal"
          name="question"
          style={{ display: "none" }}
        >
          click to reveal the answer
        </button>
      </div>
    </div>
  );
}

export default App;
