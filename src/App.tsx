import { useState } from "react";
import "./App.css";
import StartPage from "./pages/StartPage";
import { Meal } from "./types";
import PlayingPage from "./pages/PlayingPage";
import EndPage from "./pages/EndPage";
import NavigationBar from "./components/NavigationBar";
import meals from "./data/meals.json";

enum GameStatus {
  START = 0,
  PLAYING = 1,
  END = 2,
}

const NUMBER_OF_QUESTIONS = 10;

const App = () => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [currentMealIndex, setCurrentMealIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [userInput, setUserInput] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<Meal[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Meal[]>([]);

  const selectRandomMeals = (quantity: number) => {
    const selected: Meal[] = [];
    while (selected.length < quantity) {
      const randomIndex = Math.floor(Math.random() * meals.length);
      const meal = meals[randomIndex];
      if (!selected.some((item) => item.id === meal.id)) {
        selected.push(meal);
      }
    }
    return selected;
  };

  const startGame = () => {
    setSelectedMeals(selectRandomMeals(NUMBER_OF_QUESTIONS));
    setGameStatus(GameStatus.PLAYING);
    setCurrentMealIndex(0);
    setScore(0);
  };

  const checkAnswer = () => {
    const currentMeal = selectedMeals[currentMealIndex];
    if (currentMeal && userInput === currentMeal.id) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, currentMeal]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentMeal]);
    }
    setCurrentMealIndex(currentMealIndex + 1);

    if (currentMealIndex === selectedMeals.length - 1) {
      setGameStatus(GameStatus.END);
    }

    setUserInput("");
  };

  const restartGame = () => {
    startGame();
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
  };

  return (
    <div>
      <NavigationBar />
      {gameStatus === GameStatus.START && <StartPage startGame={startGame} />}
      {gameStatus === GameStatus.PLAYING && (
        <PlayingPage
          numberOfQuestions={NUMBER_OF_QUESTIONS}
          currentMealIndex={currentMealIndex}
          selectedMeals={selectedMeals}
          userInput={userInput}
          setUserInput={setUserInput}
          checkAnswer={checkAnswer}
        />
      )}
      {gameStatus === GameStatus.END && (
        <EndPage
          score={score}
          restartGame={restartGame}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />
      )}
    </div>
  );
};

export default App;
