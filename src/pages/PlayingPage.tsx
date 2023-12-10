import React from "react";
import { NUMBER_OF_QUESTIONS } from "../constants";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  GameStatus,
  correctAnswersState,
  currentMealIndexState,
  formattedUserInputState,
  gameStatusState,
  incorrectAnswersState,
  selectedMealsState,
  userInputState,
} from "../states";

export const PlayingPage: React.FC = () => {
  const selectedMeals = useRecoilValue(selectedMealsState);
  const [currentMealIndex, setCurrentMealIndex] = useRecoilState(
    currentMealIndexState,
  );
  const [userInput, setUserInput] = useRecoilState(userInputState);
  const formattedUserInput = useRecoilValue(formattedUserInputState);
  const [correctAnswers, setCorrectAnswers] =
    useRecoilState(correctAnswersState);
  const [incorrectAnswers, setIncorrectAnswers] = useRecoilState(
    incorrectAnswersState,
  );
  const setGameStatus = useSetRecoilState(gameStatusState);
  const [showResult, setShowResult] = React.useState(false);
  const currentMeal = selectedMeals[currentMealIndex];
  const isCorrect = currentMeal && formattedUserInput === currentMeal.id;

  const checkAnswer = () => {
    if (isCorrect) {
      setCorrectAnswers([...correctAnswers, currentMeal]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentMeal]);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);

    if (currentMealIndex === selectedMeals.length - 1) {
      setGameStatus(GameStatus.END);
    } else {
      setUserInput("");
      setCurrentMealIndex(currentMealIndex + 1);
    }
  };

  return (
    <div>
      <p>
        {currentMealIndex + 1} / {NUMBER_OF_QUESTIONS}
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
          disabled={showResult}
        />
        <button type="button" onClick={checkAnswer} disabled={showResult}>
          回答
        </button>{" "}
      </label>
      {showResult && (
        <div>
          {isCorrect ? (
            <p>大正解！すごいじゃん！</p>
          ) : (
            <p>残念！正解は{currentMeal.id}でした！</p>
          )}
          <button type="button" onClick={nextQuestion}>
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
};

if (import.meta.vitest) {
  const { afterEach, describe, test, expect, vi } = import.meta.vitest;
  const { RecoilRoot } = await import("recoil");
  const { cleanup, render, fireEvent } = await import("@testing-library/react");
  const {
    correctAnswersState,
    currentMealIndexState,
    selectedMealsState,
    userInputState,
  } = await import("../states");
  const { RecoilObserver } = await import("../utils/RecoilObserver");

  describe("PlayingPage", () => {
    afterEach(() => {
      cleanup();
    });

    test("現在の問題番号が表示される", async () => {
      const mockedCurrentMealIndexState = 0;
      const mockedSelectedMealsState = [
        {
          id: "1",
          name: "カルボナーラ",
          imagePath: "/",
        },
      ];

      const { findByText } = render(
        <RecoilRoot
          initializeState={(snapshot) => {
            snapshot.set(currentMealIndexState, mockedCurrentMealIndexState);
            snapshot.set(selectedMealsState, mockedSelectedMealsState);
          }}
        >
          <PlayingPage />
        </RecoilRoot>,
      );

      expect(await findByText("1 / 10")).toBeInTheDocument();
    });

    test("現在の問題の画像が表示される", async () => {
      const mockedCurrentMealIndexState = 0;
      const mockedSelectedMealsState = [
        {
          id: "1",
          name: "カルボナーラ",
          imagePath: "/",
        },
      ];

      const { findByAltText } = render(
        <RecoilRoot
          initializeState={(snapshot) => {
            snapshot.set(currentMealIndexState, mockedCurrentMealIndexState);
            snapshot.set(selectedMealsState, mockedSelectedMealsState);
          }}
        >
          <PlayingPage />
        </RecoilRoot>,
      );

      expect(await findByAltText("カルボナーラ")).toBeInTheDocument();
    });

    test("現在の問題の名前が表示される", async () => {
      const mockedCurrentMealIndexState = 0;
      const mockedSelectedMealsState = [
        {
          id: "1",
          name: "カルボナーラ",
          imagePath: "/",
        },
      ];

      const { findByText } = render(
        <RecoilRoot
          initializeState={(snapshot) => {
            snapshot.set(currentMealIndexState, mockedCurrentMealIndexState);
            snapshot.set(selectedMealsState, mockedSelectedMealsState);
          }}
        >
          <PlayingPage />
        </RecoilRoot>,
      );

      expect(await findByText("カルボナーラ")).toBeInTheDocument();
    });

    describe("回答欄に文字を入力したとき", () => {
      test("userInputが更新される", async () => {
        const onChange = vi.fn();
        const mockedCurrentMealIndexState = 0;
        const mockedSelectedMealsState = [
          {
            id: "1",
            name: "カルボナーラ",
            imagePath: "/",
          },
        ];
        const mockedUserInputState = "";

        const { findByLabelText } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(currentMealIndexState, mockedCurrentMealIndexState);
              snapshot.set(selectedMealsState, mockedSelectedMealsState);
              snapshot.set(userInputState, mockedUserInputState);
            }}
          >
            <RecoilObserver node={userInputState} onChange={onChange} />
            <PlayingPage />
          </RecoilRoot>,
        );

        fireEvent.change(await findByLabelText("メニュー番号"), {
          target: { value: "2" },
        });

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith(mockedUserInputState);
        expect(onChange).toHaveBeenCalledWith("2");
      });
    });

    describe("回答ボタンを押したとき", () => {
      describe("正解のとき", () => {
        test("正解のリストに追加される", async () => {
          const onChange = vi.fn();
          const mockedSelectedMealsState = [
            {
              id: "1",
              name: "カルボナーラ",
              imagePath: "/",
            },
          ];
          const mockedUserInputState = "1";

          const { findByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(currentMealIndexState, 0);
                snapshot.set(selectedMealsState, mockedSelectedMealsState);
                snapshot.set(correctAnswersState, []);
                snapshot.set(userInputState, mockedUserInputState);
              }}
            >
              <RecoilObserver node={correctAnswersState} onChange={onChange} />
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(await findByText("回答"));

          expect(onChange).toHaveBeenCalledTimes(2);
          expect(onChange).toHaveBeenCalledWith([]);
          expect(onChange).toHaveBeenCalledWith(mockedSelectedMealsState);
        });

        test("正解の結果が表示される", async () => {
          const { getByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(selectedMealsState, [
                  {
                    id: "1",
                    name: "カルボナーラ",
                    imagePath: "/",
                  },
                ]);
                snapshot.set(userInputState, "1");
              }}
            >
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(getByText("回答"));

          expect(getByText("大正解！すごいじゃん！")).toBeInTheDocument();
        });
      });

      describe("不正解のとき", () => {
        test("不正解のリストに追加される", async () => {
          const onChange = vi.fn();
          const mockedSelectedMealsState = [
            {
              id: "1",
              name: "カルボナーラ",
              imagePath: "/",
            },
          ];
          const mockedUserInputState = "2";

          const { findByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(currentMealIndexState, 0);
                snapshot.set(selectedMealsState, mockedSelectedMealsState);
                snapshot.set(incorrectAnswersState, []);
                snapshot.set(userInputState, mockedUserInputState);
              }}
            >
              <RecoilObserver
                node={incorrectAnswersState}
                onChange={onChange}
              />
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(await findByText("回答"));

          expect(onChange).toHaveBeenCalledTimes(2);
          expect(onChange).toHaveBeenCalledWith([]);
          expect(onChange).toHaveBeenCalledWith(mockedSelectedMealsState);
        });

        test("不正解の結果と正解のメニュー番号が表示される", async () => {
          const { getByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(selectedMealsState, [
                  {
                    id: "1",
                    name: "カルボナーラ",
                    imagePath: "/",
                  },
                ]);
                snapshot.set(userInputState, "2");
              }}
            >
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(getByText("回答"));

          expect(getByText("残念！正解は1でした！")).toBeInTheDocument();
        });
      });
    });

    describe("次の問題へボタンを押したとき", () => {
      describe("最後の問題のとき", () => {
        test("終了画面になる", async () => {
          const onChange = vi.fn();
          const mockedSelectedMealsState = [
            {
              id: "1",
              name: "カルボナーラ",
              imagePath: "/",
            },
          ];
          const mockedUserInputState = "1";

          const { findByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(currentMealIndexState, 0);
                snapshot.set(selectedMealsState, mockedSelectedMealsState);
                snapshot.set(gameStatusState, GameStatus.PLAYING);
                snapshot.set(userInputState, mockedUserInputState);
              }}
            >
              <RecoilObserver node={gameStatusState} onChange={onChange} />
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(await findByText("回答"));
          fireEvent.click(await findByText("次の問題へ"));

          expect(onChange).toHaveBeenCalledTimes(2);
          expect(onChange).toHaveBeenCalledWith(GameStatus.PLAYING);
          expect(onChange).toHaveBeenCalledWith(GameStatus.END);
        });
      });

      describe("最後の問題ではないとき", () => {
        test("userInputが空になる", async () => {
          const onChange = vi.fn();
          const mockedSelectedMealsState = [
            {
              id: "1",
              name: "カルボナーラ",
              imagePath: "/",
            },
            {
              id: "2",
              name: "ミートソース",
              imagePath: "/",
            },
          ];
          const mockedUserInputState = "1";

          const { findByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(currentMealIndexState, 0);
                snapshot.set(selectedMealsState, mockedSelectedMealsState);
                snapshot.set(userInputState, mockedUserInputState);
              }}
            >
              <RecoilObserver node={userInputState} onChange={onChange} />
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(await findByText("回答"));
          fireEvent.click(await findByText("次の問題へ"));

          expect(onChange).toHaveBeenCalledTimes(2);
          expect(onChange).toHaveBeenCalledWith(mockedUserInputState);
          expect(onChange).toHaveBeenCalledWith("");
        });

        test("次の問題に進む", async () => {
          const onChange = vi.fn();
          const mockedSelectedMealsState = [
            {
              id: "1",
              name: "カルボナーラ",
              imagePath: "/",
            },
            {
              id: "2",
              name: "ミートソース",
              imagePath: "/",
            },
          ];
          const mockedUserInputState = "1";

          const { findByText } = render(
            <RecoilRoot
              initializeState={(snapshot) => {
                snapshot.set(currentMealIndexState, 0);
                snapshot.set(selectedMealsState, mockedSelectedMealsState);
                snapshot.set(userInputState, mockedUserInputState);
              }}
            >
              <RecoilObserver
                node={currentMealIndexState}
                onChange={onChange}
              />
              <PlayingPage />
            </RecoilRoot>,
          );

          fireEvent.click(await findByText("回答"));
          fireEvent.click(await findByText("次の問題へ"));

          expect(onChange).toHaveBeenCalledTimes(2);
          expect(onChange).toHaveBeenCalledWith(0);
          expect(onChange).toHaveBeenCalledWith(1);
        });
      });
    });
  });
}
