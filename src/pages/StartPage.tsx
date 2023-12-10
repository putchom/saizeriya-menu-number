import React from "react";

type StartPageProps = {
  startGame: () => void;
};

export const StartPage: React.FC<StartPageProps> = (props) => {
  const { startGame } = props;

  return (
    <div>
      <p>
        サイゼの料理の
        <br />
        メニュー番号を
        <br />
        当てまくれ！
      </p>
      <button type="button" onClick={startGame}>
        プレイ
      </button>
    </div>
  );
};
