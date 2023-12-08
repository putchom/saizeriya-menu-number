import { useState } from "react";
import "./App.css";

interface Image {
  id: string;
  path: string;
}

enum GameStatus {
  START,
  PLAYING,
  END,
}

const App = () => {
  const [images] = useState<Image[]>([
    { id: "101", path: "image1.jpg" },
    { id: "102", path: "image2.jpg" },
    { id: "103", path: "image3.jpg" },
    { id: "104", path: "image4.jpg" },
    { id: "105", path: "image5.jpg" },
    { id: "106", path: "image6.jpg" },
    { id: "107", path: "image7.jpg" },
    { id: "108", path: "image8.jpg" },
    { id: "109", path: "image9.jpg" },
    { id: "110", path: "image10.jpg" },
    { id: "111", path: "image11.jpg" },
    { id: "112", path: "image12.jpg" },
    { id: "113", path: "image13.jpg" },
    { id: "114", path: "image14.jpg" },
    { id: "115", path: "image15.jpg" },
    { id: "116", path: "image16.jpg" },
    { id: "117", path: "image17.jpg" },
    { id: "118", path: "image18.jpg" },
    { id: "119", path: "image19.jpg" },
    { id: "120", path: "image20.jpg" },
  ]);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [userInput, setUserInput] = useState<string>("");
  const [tweetText, setTweetText] = useState<string>("");
  const [currentInputId, setCurrentInputId] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<Image[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Image[]>([]);

  const selectRandomImages = (): Image[] => {
    const selected: Image[] = [];
    while (selected.length < 5) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const image = images[randomIndex];
      if (!selected.some((img) => img.id === image.id)) {
        selected.push(image);
      }
    }
    return selected;
  };

  const startGame = (): void => {
    const newSelectedImages = selectRandomImages();
    setSelectedImages(newSelectedImages);
    setGameStatus(GameStatus.PLAYING);
    setCurrentImageIndex(0);
    setScore(0);
    setTweetText("");
    setCurrentInputId(newSelectedImages[0].id);
    setAnswerFeedback(null);

    console.log("現在のID: ", newSelectedImages[0].id);
  };

  const checkAnswer = (): void => {
    const currentImage = selectedImages[currentImageIndex];
    if (currentImage && userInput === currentImage.id) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, currentImage]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentImage]);
    }
    setCurrentImageIndex(currentImageIndex + 1);

    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentInputId(selectedImages[currentImageIndex + 1].id);
      console.log("現在のID: ", selectedImages[currentImageIndex + 1]?.id);
    }

    if (currentImageIndex === selectedImages.length - 1) {
      setGameStatus(GameStatus.END);
      setTweetText(`私の得点は ${score} 点でした！ #フラッシュサイゼリヤ`);
    }

    setUserInput("");
  };

  const tweetScore = (): void => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
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
      <div>
        <h1>フラッシュサイゼリヤ</h1>
      </div>
      {gameStatus === GameStatus.START && (
        <div>
          <h2>サイゼリヤのメニューの写真を見て注文IDを当てよう</h2>
          <button onClick={startGame}>プレイ</button>
        </div>
      )}
      {gameStatus === GameStatus.PLAYING && (
        <div>
          <p>現在の問題: {currentImageIndex + 1} / 5</p>
          <img
            src={selectedImages[currentImageIndex]?.path}
            width="300"
            height="200"
          />
          <p>
            IDを入力してください:
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={checkAnswer}>次へ</button>{" "}
          </p>
          {answerFeedback && <p>{answerFeedback}</p>}
        </div>
      )}
      {gameStatus === GameStatus.END && (
        <div>
          <p>得点: {score}</p>
          <button onClick={tweetScore}>得点をツイート</button>
          <button onClick={restartGame}>もう一度プレイ</button>
          <div>
            <h2>正解</h2>
            <ul>
              {correctAnswers.map((item) => (
                <li key={item.id}>
                  <img
                    src={item.path}
                    alt={`ID: ${item.id}`}
                    width="100"
                    height="75"
                  />
                  <span>ID: {item.id}</span>
                </li>
              ))}
            </ul>
            <h2>不正解</h2>
            <ul>
              {incorrectAnswers.map((item) => (
                <li key={item.id}>
                  <img
                    src={item.path}
                    alt={`ID: ${item.id}`}
                    width="100"
                    height="75"
                  />
                  <span>ID: {item.id}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
