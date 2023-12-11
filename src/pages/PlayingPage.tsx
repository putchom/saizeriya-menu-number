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
import { AspectRatio, Button, Flex, Text, TextField } from "@radix-ui/themes";

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
    <Flex direction="column" gap="5">
      <Text as="p" align="center" weight="bold" size="5" color="grass">
        {currentMealIndex + 1} / {NUMBER_OF_QUESTIONS}
      </Text>
      <AspectRatio ratio={1 / 1}>
        <img
          src={selectedMeals[currentMealIndex]?.imagePath}
          alt={selectedMeals[currentMealIndex]?.name}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            borderRadius: "var(--radius-4)",
            backgroundColor: "var(--accent-4)",
          }}
        />
      </AspectRatio>
      <Text as="p" weight="bold" size="6">
        {selectedMeals[currentMealIndex]?.name}
      </Text>
      {showResult ? (
        <Flex direction="column" gap="2">
          {isCorrect ? (
            <Text as="p">大正解！すごいじゃん！</Text>
          ) : (
            <Text as="p">残念！正解は{currentMeal.id}でした！</Text>
          )}
          <Button type="button" onClick={nextQuestion} size="3">
            次の問題へ
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" gap="2">
          <Flex direction="column" gap="1">
            <Text as="label" htmlFor="user-input" weight="bold" size="2">
              メニュー番号
            </Text>
            <TextField.Root>
              <TextField.Input
                id="user-input"
                size="3"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                required
                disabled={showResult}
              />
            </TextField.Root>
          </Flex>
          <Button onClick={checkAnswer} disabled={showResult} size="3">
            回答
          </Button>
        </Flex>
      )}
    </Flex>
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

      expect(await findByText("1 / 6")).toBeInTheDocument();
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
