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

const App = () => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [currentMealIndex, setCurrentMealIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [userInput, setUserInput] = useState<string>("");
  const [tweetText, setTweetText] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<Meal[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Meal[]>([]);

  const selectRandomMeals = (): Meal[] => {
    const selected: Meal[] = [];
    while (selected.length < 10) {
      const randomIndex = Math.floor(Math.random() * meals.length);
      const image = meals[randomIndex];
      if (!selected.some((img) => img.id === image.id)) {
        selected.push(image);
      }
    }
    return selected;
  };

  const startGame = (): void => {
    setSelectedMeals(selectRandomMeals());
    setGameStatus(GameStatus.PLAYING);
    setCurrentMealIndex(0);
    setScore(0);
    setTweetText("");
  };

  const checkAnswer = (): void => {
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
      setTweetText(
        `サイゼのメニュー番号を ${score} 個当てました！ #サイゼの注文番号を当てろ！`,
      );
    }

    setUserInput("");
  };

  const tweetScore = (): void => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText,
    )}`;
    window.open(tweetUrl, "_blank");
  };

  const restartGame = (): void => {
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
          tweetScore={tweetScore}
          restartGame={restartGame}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />
      )}
    </div>
  );
};

export default App;
