import { Meal } from "../types";

type EndPageProps = {
  score: number;
  tweetScore: () => void;
  restartGame: () => void;
  correctAnswers: Meal[];
  incorrectAnswers: Meal[];
};

const EndPage = (props: EndPageProps) => {
  const { score, tweetScore, restartGame, correctAnswers, incorrectAnswers } =
    props;

  return (
    <div>
      <p>結果: {score}個正解</p>
      <button type="button" onClick={tweetScore}>
        結果をツイート
      </button>
      <button type="button" onClick={restartGame}>
        もう一度プレイ
      </button>
      <div>
        <h2>正解</h2>
        {correctAnswers.length === 0 && <p>なし</p>}
        {correctAnswers.length > 0 && (
          <ul>
            {correctAnswers.map((item) => (
              <li key={item.id}>
                <img src={item.imagePath} alt={`ID: ${item.id}`} width="100" />
                <p>{item.name}</p>
                <p>{item.id}</p>
              </li>
            ))}
          </ul>
        )}
        <h2>不正解</h2>
        {incorrectAnswers.length === 0 && <p>なし</p>}
        {incorrectAnswers.length > 0 && (
          <ul>
            {incorrectAnswers.map((item) => (
              <li key={item.id}>
                <img src={item.imagePath} alt={`ID: ${item.id}`} width="100" />
                <p>{item.name}</p>
                <p>{item.id}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EndPage;
