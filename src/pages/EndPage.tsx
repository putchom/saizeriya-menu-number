import React from "react";
import { AnswerListItem } from "../components/AnswerListItem";
import { NUMBER_OF_QUESTIONS } from "../constants";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  GameStatus,
  correctAnswersState,
  gameStatusState,
  incorrectAnswersState,
} from "../states";

export const EndPage: React.FC = () => {
  const correctAnswers = useRecoilValue(correctAnswersState);
  const incorrectAnswers = useRecoilValue(incorrectAnswersState);
  const setGameStatus = useSetRecoilState(gameStatusState);

  const tweetScore = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `サイゼのメニュー番号を ${NUMBER_OF_QUESTIONS}問中 ${correctAnswers.length} 問当てました！ #サイゼのメニュー番号`,
    )}`;
    window.open(tweetUrl, "_blank");
  };

  const backToTop = () => {
    setGameStatus(GameStatus.START);
  };

  return (
    <div>
      <p>結果: {correctAnswers.length}個正解</p>
      <button type="button" onClick={tweetScore}>
        結果をツイート
      </button>
      <button type="button" onClick={backToTop}>
        トップに戻る
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
