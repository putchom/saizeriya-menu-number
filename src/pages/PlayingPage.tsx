import React from "react";
import { Meal } from "../types";

type PlayingPageProps = {
  numberOfQuestions: number;
  currentMealIndex: number;
  selectedMeals: Meal[];
  userInput: string;
  setUserInput: (input: string) => void;
  checkAnswer: () => void;
};

export const PlayingPage: React.FC<PlayingPageProps> = (props) => {
  const {
    numberOfQuestions,
    currentMealIndex,
    selectedMeals,
    userInput,
    setUserInput,
    checkAnswer,
  } = props;

  return (
    <div>
      <p>
        {currentMealIndex + 1} / {numberOfQuestions}
      </p>
      <img
        src={selectedMeals[currentMealIndex]?.imagePath}
        width="300"
        alt={selectedMeals[currentMealIndex]?.name}
      />
      <p>{selectedMeals[currentMealIndex]?.name}</p>
      <label>
        <div>メニュー番号</div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="(例) AA01"
          required
        />
        <button type="button" onClick={checkAnswer}>
          回答
        </button>{" "}
      </label>
    </div>
  );
};
