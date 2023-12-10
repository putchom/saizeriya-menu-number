import React from "react";
import meals from "../data/meals.json";
import { AnswerListItem } from "../components/AnswerListItem";
import { NUMBER_OF_QUESTIONS } from "../constants/numberOfQuestions";
import { useRecoilState, useSetRecoilState } from "recoil";
import { correctAnswersState } from "../states/correctAnswersState";
import { selectRandomMeals } from "../utils/selectRandomMeals";
import { selectedMealsState } from "../states/selectedMealsState";
import { GameStatus, gameStatusState } from "../states/gameStatusState";
import { currentMealIndexState } from "../states/currentMealIndexState";
import { incorrectAnswersState } from "../states/incorrectAnswersState";

export const EndPage: React.FC = () => {
  const [correctAnswers, setCorrectAnswers] =
    useRecoilState(correctAnswersState);
  const [incorrectAnswers, setIncorrectAnswers] = useRecoilState(
    incorrectAnswersState,
  );
  const setSelectedMeals = useSetRecoilState(selectedMealsState);
  const setGameStatus = useSetRecoilState(gameStatusState);
  const setCurrentMealIndex = useSetRecoilState(currentMealIndexState);

  const tweetScore = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `サイゼのメニュー番号を ${NUMBER_OF_QUESTIONS}問中 ${correctAnswers.length} 問当てました！ #サイゼのメニュー番号`,
    )}`;
    window.open(tweetUrl, "_blank");
  };

  const restartGame = () => {
    setSelectedMeals(
      selectRandomMeals({ meals: meals, quantity: NUMBER_OF_QUESTIONS }),
    );
    setGameStatus(GameStatus.PLAYING);
    setCurrentMealIndex(0);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
  };

  return (
    <div>
      <p>結果: {correctAnswers.length}個正解</p>
      <button type="button" onClick={tweetScore}>
        結果をツイート
      </button>
      <button type="button" onClick={restartGame}>
        もう一度プレイ
      </button>
      <div>
        <h2>正解</h2>
        {correctAnswers.length === 0 ? (
          <p>なし</p>
        ) : (
          <ul>
            {correctAnswers.map((item) => (
              <AnswerListItem key={item.id} meal={item} />
            ))}
          </ul>
        )}
        <h2>不正解</h2>
        {incorrectAnswers.length === 0 ? (
          <p>なし</p>
        ) : (
          <ul>
            {incorrectAnswers.map((item) => (
              <AnswerListItem key={item.id} meal={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
