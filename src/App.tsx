import { useState } from "react";
import "./App.css";

interface Image {
  id: string;
  name: string;
  path: string;
}

enum GameStatus {
  START = 0,
  PLAYING = 1,
  END = 2,
}

const App = () => {
  const images = [
    {
      id: "AA01",
      name: "辛味チキン",
      path: "/images/AA01.png",
    },
    {
      id: "AA02",
      name: "アロスティチーニ",
      path: "/images/AA02.png",
    },
    {
      id: "AA03",
      name: "ほうれん草のソテー",
      path: "/images/AA03.png",
    },
    {
      id: "AA04",
      name: "ポップコーンシュリンプ",
      path: "/images/AA04.png",
    },
    {
      id: "AA05",
      name: "エスカルゴのオーブン焼き",
      path: "/images/AA05.png",
    },
    {
      id: "AA06",
      name: "小エビのカクテル",
      path: "/images/AA06.png",
    },
    {
      id: "AA07",
      name: "チョリソー",
      path: "/images/AA07.png",
    },
    {
      id: "AA08",
      name: "蒸し鶏の香味ソース",
      path: "/images/AA08.png",
    },
    {
      id: "AA10",
      name: "ムール貝のガーリック焼き",
      path: "/images/AA10.png",
    },
    {
      id: "AA13",
      name: "爽やかにんじんサラダ",
      path: "/images/AA13.png",
    },
    {
      id: "AA14",
      name: "モッツァレラトマト",
      path: "/images/AA14.png",
    },
    {
      id: "AA15",
      name: "カリッとポテト",
      path: "/images/AA15.png",
    },
    {
      id: "AA22",
      name: "生ハム(ハモン・セラーノ)",
      path: "/images/AA22.png",
    },
    {
      id: "AA25",
      name: "柔らか青豆の温サラダ",
      path: "/images/AA25.png",
    },
    {
      id: "AA52",
      name: "アロスティチーニ（Wサイズ）",
      path: "/images/AA52.png",
    },
    {
      id: "BR01",
      name: "生ビール キリン一番搾り(ジョッキ)",
      path: "/images/BR01.png",
    },
    {
      id: "BR02",
      name: "生ビール キリン一番搾り(グラスビール)",
      path: "/images/BR02.png",
    },
    {
      id: "BR03",
      name: "アサヒドライゼロ",
      path: "/images/BR03.png",
    },
    {
      id: "BR04",
      name: "キリン氷結シチリア産レモン",
      path: "/images/BR04.png",
    },
    {
      id: "BR06",
      name: "グラッパ",
      path: "/images/BR06.png",
    },
    {
      id: "DB01",
      name: "セットドリンクバー",
      path: "/images/DB01.png",
    },
    {
      id: "DB02",
      name: "キッズドリンクバー",
      path: "/images/DB02.png",
    },
    {
      id: "DB03",
      name: "単品ドリンクバー",
      path: "/images/DB03.png",
    },
    {
      id: "DE01",
      name: "ティラミスクラシコ",
      path: "/images/DE01.png",
    },
    {
      id: "DE04",
      name: "ジェラート&シナモンプチフォッカ",
      path: "/images/DE04.png",
    },
    {
      id: "DE05",
      name: "イタリアンジェラート",
      path: "/images/DE05.png",
    },
    {
      id: "DE06",
      name: "イタリアンプリン",
      path: "/images/DE06.png",
    },
    {
      id: "DE07",
      name: "チョコレートケーキ",
      path: "/images/DE07.png",
    },
    {
      id: "DE12",
      name: "プリンとティラミスクラシコの盛り合わせ",
      path: "/images/DE12.png",
    },
    {
      id: "DE13",
      name: "トリフアイスクリーム",
      path: "/images/DE13.png",
    },
    {
      id: "DE15",
      name: "コーヒーゼリー&イタリアンジェラート",
      path: "/images/DE15.png",
    },
    {
      id: "DE25",
      name: "シチリア産ピスタチオのジェラート",
      path: "/images/DE25.png",
    },
    {
      id: "DG01",
      name: "ミラノ風ドリア",
      path: "/images/DG01.png",
    },
    {
      id: "DG03",
      name: "半熟卵のミラノ風ドリア",
      path: "/images/DG03.png",
    },
    {
      id: "DG06",
      name: "タラコとエビのドリア",
      path: "/images/DG06.png",
    },
    {
      id: "DG07",
      name: "エビクリームグラタン",
      path: "/images/DG07.png",
    },
    {
      id: "DG08",
      name: "焼きチーズ ミラノ風ドリア",
      path: "/images/DG08.png",
    },
    {
      id: "KZ05",
      name: "おこさまポップコーンシュリンプ",
      path: "/images/KZ05.png",
    },
    {
      id: "KZ06",
      name: "おこさまポテト",
      path: "/images/KZ06.png",
    },
    {
      id: "MT02",
      name: "若鶏のディアボラ風",
      path: "/images/MT02.png",
    },
    {
      id: "MT03",
      name: "イタリアンハンバーグ",
      path: "/images/MT03.png",
    },
    {
      id: "MT04",
      name: "柔らかチキンのチーズ焼き",
      path: "/images/MT04.png",
    },
    {
      id: "MT06",
      name: "ハンバーグステーキ",
      path: "/images/MT06.png",
    },
    {
      id: "MT07",
      name: "ディアボラ風ハンバーグ",
      path: "/images/MT07.png",
    },
    {
      id: "MT13",
      name: "ラムと野菜のグリル",
      path: "/images/MT13.png",
    },
    {
      id: "MT18",
      name: "チョリソーとハンバーグの盛合せ",
      path: "/images/MT18.png",
    },
    {
      id: "PA01",
      name: "タラコソースシシリー風",
      path: "/images/PA01.png",
    },
    {
      id: "PA02",
      name: "ミートソースボロニア風",
      path: "/images/PA02.png",
    },
    {
      id: "PA03",
      name: "ペペロンチーノ",
      path: "/images/PA03.png",
    },
    {
      id: "PA04",
      name: "パルマ風スパゲッティ",
      path: "/images/PA04.png",
    },
    {
      id: "PA05",
      name: "カルボナーラ",
      path: "/images/PA05.png",
    },
    {
      id: "PA10",
      name: "スープ入り塩味ボンゴレ",
      path: "/images/PA10.png",
    },
    {
      id: "PA11",
      name: "イカの墨入りスパゲッティ",
      path: "/images/PA11.png",
    },
    {
      id: "PA12",
      name: "ミートソースボロニア風",
      path: "/images/PA12.png",
    },
    {
      id: "PA14",
      name: "エビとアスパラガスのオーロラソース",
      path: "/images/PA14.png",
    },
    {
      id: "PA16",
      name: "きのことチキンのスパゲッティ",
      path: "/images/PA16.png",
    },
    {
      id: "PA17",
      name: "半熟卵のペペロンチーノ",
      path: "/images/PA17.png",
    },
    {
      id: "PA18",
      name: "たっぷりペコリーノチーズのカルボナーラ",
      path: "/images/PA18.png",
    },
    {
      id: "PA20",
      name: "小エビのたらこソース",
      path: "/images/PA20.png",
    },
    {
      id: "PA23",
      name: "たっぷりペコリーノチーズのパルマ風スパゲッティ",
      path: "/images/PA23.png",
    },
    {
      id: "PA25",
      name: "ペンネアラビアータ",
      path: "/images/PA25.png",
    },
    {
      id: "PZ01",
      name: "マルゲリータピザ",
      path: "/images/PZ01.png",
    },
    {
      id: "PZ02",
      name: "バッファローモッツァレラのピザ",
      path: "/images/PZ02.png",
    },
    {
      id: "PZ04",
      name: "野菜ときのこのピザ",
      path: "/images/PZ04.png",
    },
    {
      id: "PZ06",
      name: "たっぷりコーンのピザ",
      path: "/images/PZ06.png",
    },
    {
      id: "PZ08",
      name: "ソーセージピザ",
      path: "/images/PZ08.png",
    },
    {
      id: "RP01",
      name: "ライス",
      path: "/images/RP01.png",
    },
    {
      id: "RP02",
      name: "ラージライス",
      path: "/images/RP02.png",
    },
    {
      id: "RP03",
      name: "スモールライス",
      path: "/images/RP03.png",
    },
    {
      id: "RP04",
      name: "シナモンプチフォッカ",
      path: "/images/RP04.png",
    },
    {
      id: "RP06",
      name: "プチフォッカ",
      path: "/images/RP06.png",
    },
    {
      id: "RP08",
      name: "ミニフィセル",
      path: "/images/RP08.png",
    },
    {
      id: "RP09",
      name: "ガーリックトースト",
      path: "/images/RP09.png",
    },
    {
      id: "SA02",
      name: "小エビのサラダ",
      path: "/images/SA02.png",
    },
    {
      id: "SA05",
      name: "わかめのサラダ",
      path: "/images/SA05.png",
    },
    {
      id: "SA07",
      name: "モッツァレラのサラダ",
      path: "/images/SA07.png",
    },
    {
      id: "SA08",
      name: "グリーンサラダ",
      path: "/images/SA08.png",
    },
    {
      id: "SA09",
      name: "チキンのサラダ",
      path: "/images/SA09.png",
    },
    {
      id: "SU01",
      name: "コーンクリームスープ",
      path: "/images/SU01.png",
    },
    {
      id: "SU05",
      name: "田舎風ミネストローネ",
      path: "/images/SU05.png",
    },
    {
      id: "RP09",
      name: "たまねぎのズッパ",
      path: "/images/RP09.png",
    },
    {
      id: "SU07",
      name: "トッピング半熟卵",
      path: "/images/SU07.png",
    },
    {
      id: "TP01",
      name: "野菜ペースト",
      path: "/images/TP01.png",
    },
    {
      id: "TP04",
      name: "トッピング粉チーズ(グランモアビア)",
      path: "/images/TP04.png",
    },
    {
      id: "WN01",
      name: "グラスワイン 赤",
      path: "/images/WN01.png",
    },
    {
      id: "WN02",
      name: "グラスワイン 白",
      path: "/images/WN02.png",
    },
    {
      id: "WN03",
      name: "デカンタ(250ml) 赤",
      path: "/images/WN03.png",
    },
    {
      id: "WN04",
      name: "デカンタ(250ml) 白",
      path: "/images/WN04.png",
    },
    {
      id: "WN05",
      name: "デカンタ(500ml) 赤",
      path: "/images/WN05.png",
    },
    {
      id: "WN06",
      name: "デカンタ(500ml) 白",
      path: "/images/WN06.png",
    },
    {
      id: "WN07",
      name: "マグナム(1500ml) 赤",
      path: "/images/WN07.png",
    },
    {
      id: "WN08",
      name: "マグナム(1500ml) 白",
      path: "/images/WN08.png",
    },
    {
      id: "WN12",
      name: "ランブルスコロゼ【(ロゼ・発泡)甘口】",
      path: "/images/WN12.png",
    },
    {
      id: "WN13",
      name: "ドンラファエロ【(白・発泡)辛口】",
      path: "/images/WN13.png",
    },
    {
      id: "WN14",
      name: "ランブルスコセッコ【(赤・発泡)辛口】",
      path: "/images/WN14.png",
    },
    {
      id: "WN15",
      name: "ベルデッキオ【(白)辛口】",
      path: "/images/WN15.png",
    },
    {
      id: "WN16",
      name: "キャンティ【(赤)辛口】",
      path: "/images/WN16.png",
    },
    {
      id: "WN19",
      name: "キャンティ ルフィナ リゼルバ【(赤)辛口】",
      path: "/images/WN19.png",
    },
  ];
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [userInput, setUserInput] = useState<string>("");
  const [tweetText, setTweetText] = useState<string>("");
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<Image[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<Image[]>([]);

  const selectRandomImages = (): Image[] => {
    const selected: Image[] = [];
    while (selected.length < 10) {
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
    setAnswerFeedback(null);
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

    if (currentImageIndex === selectedImages.length - 1) {
      setGameStatus(GameStatus.END);
      setTweetText(
        `サイゼリヤのメニュー番号を ${score} 個当てました！ #サイゼリヤの注文番号を当てろ！`,
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
      <div>
        <h1>サイゼリヤの注文番号を当てろ！</h1>
        <nav>
          <ul>
            <li>
              <a
                href="https://book.saizeriya.co.jp/library/menu1907/book/list"
                target="_blank"
                rel="noreferrer"
              >
                チートシート
              </a>
            </li>
            <li>
              <a
                href="https://x.com/putchom"
                target="_blank"
                rel="noopener noreferrer"
              >
                by @putchom
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {gameStatus === GameStatus.START && (
        <div>
          <p>
            サイゼリヤの料理を見て！
            <br />
            メニュー番号を！
            <br />
            当てまくれ！
          </p>
          <button type="button" onClick={startGame}>
            プレイ
          </button>
        </div>
      )}
      {gameStatus === GameStatus.PLAYING && (
        <div>
          <p>{currentImageIndex + 1} / 10</p>
          <img
            src={selectedImages[currentImageIndex]?.path}
            width="300"
            alt={selectedImages[currentImageIndex]?.name}
          />
          <p>{selectedImages[currentImageIndex]?.name}</p>
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
          {answerFeedback && <p>{answerFeedback}</p>}
        </div>
      )}
      {gameStatus === GameStatus.END && (
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
                    <img src={item.path} alt={`ID: ${item.id}`} width="100" />
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
                    <img src={item.path} alt={`ID: ${item.id}`} width="100" />
                    <p>{item.name}</p>
                    <p>{item.id}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
