type StartPageProps = {
  startGame: () => void;
};

const StartPage = (props: StartPageProps) => {
  const { startGame } = props;

  return (
    <div>
      <p>
        サイゼの料理の！
        <br />
        メニュー番号を！
        <br />
        当てまくれ！
      </p>
      <button type="button" onClick={startGame}>
        プレイ
      </button>
    </div>
  );
};

export default StartPage;
