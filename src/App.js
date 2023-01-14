import "./App.css";
import SingleCard from "./components/SingleCard";
import { useState, useEffect } from "react";

const cardImages = [
  { src: "../img/helmet-1.png", matched: false },
  { src: "../img/potion-1.png", matched: false },
  { src: "../img/ring-1.png", matched: false },
  { src: "../img/scroll-1.png", matched: false },
  { src: "../img/shield-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [disabled, setDisabled] = useState(false);

  // user choice
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // Duplicate, Shuffle cards
  const shuffleCards = () => {
    const shuffledCard = [...cardImages, ...cardImages] // duplicate and put in new array
      .sort(() => Math.random() - 0.5) // sort every single/.pair card and then math.random in order to have some random number the end result is to shuffled card
      .map((card) => ({ ...card, id: Math.random() })); //iterate using map method to add id property which is random number for each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCard);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice and increase turns
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
