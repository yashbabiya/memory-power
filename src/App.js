import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let data = [
    { num: 1, img: "😋" },
    { num: 2, img: "😃" },
    { num: 3, img: "😡" },
    { num: 4, img: "😺" },
    { num: 5, img: "🤟" },
    { num: 6, img: "😯" },
    { num: 7, img: "👽" },
    { num: 8, img: "🙈" },
    { num: 9, img: "💯" },
    { num: 10, img: "🧠" }
  ];
  let [count, setCount] = useState(0);
  let [first, setFirst] = useState(-1);
  const [cards, setCards] = useState([]);
  const [game, setGame] = useState(null);
  const [timer, setTimer] = useState(false);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const modeName = ["Master", "Beginner", "Moderate"];

  function reStart() {
    setTimer(false);
    setFirst(-1);
    setCount(0);
    var nodes = document.getElementById("board").childNodes;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList?.remove("turned");
    }
    setCards([]);
    if (mode === 1) {
      data.splice(3);
    } else if (mode === 2) {
      data.splice(5);
    }
    shuffle([...data, ...data]);
  }
  function changeTheme() {
    if (darkMode) document.body.classList.add("darkmode");
    else document.body.classList.remove("darkmode");
    setDarkMode(!darkMode);

  }
  useEffect(() => {}, []);
  useEffect(() => {
    reStart();
  }, [mode]);
  useEffect(() => {
    setGame(cards);
  }, [cards]);
  useEffect(() => {
    if (game?.length === 0 && count === 0) {
      const duration = (new Date().getTime() - timer) / 1000 + "s";

      setHistory((prev) => [{ duration, mode }, ...prev]);
      setTimer(false);
    }
  }, [count]);
  function shuffle(array = [...data, ...data]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    setCards(array);
  }
  const turnCard = (id) => {
    if (id != null) document.getElementById(id).classList.add("turned");
  };
  const hideCard = (id) => {
    if (id != null) document.getElementById(id).classList.remove("turned");
  };
  const turn = (card) => {
    if (!timer) {
      setTimer(new Date().getTime());
    }
    if (count === 0) {
      turnCard(card.id);
      setCount(1);
      setFirst(card);
    }
    if (count === 1) {
      setCount(0);
      turnCard(card.id);
      if (first.num === card.num) {
        setGame((prev) =>
          prev.filter(function (crd) {
            return crd.num !== card.num;
          })
        );
      } else {
        setTimeout(() => {
          hideCard(card.id);
          hideCard(first.id);
          setFirst({});
        }, 200);
      }
    }
  };
  return (
    <div className="App">
      <h1>Memory Power</h1>
      <code>
        <button
          className={` ${modeName[mode]}`}
          disabled={timer}
          onClick={() => setMode((prev) => (prev + 1) % 3)}
        >
          {modeName[mode]}
        </button>
        <button onClick={reStart}>
          <i className="im im-reset"></i>
        </button>
        <button onClick={changeTheme}>
          <i className="im im-sun"></i>
        </button>
      </code>
      <div id="board" className="board">
        {cards?.map((crd, index) => {
          return (
            <div
              id={index}
              key={index}
              className={`card ${modeName[mode]}`}
              onClick={() => turn({ num: crd.num, id: index })}
            >
              <p>{crd.img}</p>
            </div>
          );
        })}
      </div>
      <div className="history">
        <h2>History</h2>
        <div className="list">
          {history.map((h) => (
            <div className={`list-card ${modeName[h.mode]}`}>{h.duration}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
