import React from "react";
import meals from "../data/meals.json";
import { NUMBER_OF_QUESTIONS } from "../constants";
import { useSetRecoilState } from "recoil";
import {
  GameStatus,
  correctAnswersState,
  currentMealIndexState,
  gameStatusState,
  incorrectAnswersState,
  selectedMealsState,
} from "../states";
import { selectRandomMeals } from "../utils/selectRandomMeals";
import { Button, Flex, Text } from "@radix-ui/themes";

export const StartPage: React.FC = () => {
  const setCorrectAnswers = useSetRecoilState(correctAnswersState);
  const setIncorrectAnswers = useSetRecoilState(incorrectAnswersState);
  const setCurrentMealIndex = useSetRecoilState(currentMealIndexState);
  const setSelectedMeals = useSetRecoilState(selectedMealsState);
  const setGameStatus = useSetRecoilState(gameStatusState);

  const resetData = () => {
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setCurrentMealIndex(0);
    setSelectedMeals(
      selectRandomMeals({ meals: meals, quantity: NUMBER_OF_QUESTIONS }),
    );
  };

  const startGame = () => {
    resetData();
    setGameStatus(GameStatus.PLAYING);
  };

  return (
    <Flex direction="column" align="center" gap="4">
      <Text align="center" size="6" weight="bold">
        サイゼの料理の
        <br />
        メニュー番号を
        <br />
        当てよう！
      </Text>
      <Button onClick={startGame}>プレイ</Button>
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
    gameStatusState,
    incorrectAnswersState,
  } = await import("../states");
  const { RecoilObserver } = await import("../utils/RecoilObserver");

  describe("StartPage", () => {
    afterEach(() => {
      cleanup();
    });

    describe("プレイボタンを押したとき", () => {
      test("データがリセットされる", async () => {
        vi.mock("../utils/selectRandomMeals", () => {
          return {
            selectRandomMeals: () => [
              {
                id: "1",
                name: "ランダムに選ばれたカルボナーラ",
                imagePath: "/",
              },
            ],
          };
        });

        const onChangeCorrectAnswersState = vi.fn();
        const onChangeIncorrectAnswersState = vi.fn();
        const onChangeCurrentMealIndexState = vi.fn();
        const onChangeSelectedMealsState = vi.fn();
        const mockedCorrectAnswersState = [
          { id: "1", name: "正解のカルボナーラ", imagePath: "/" },
        ];
        const mockedIncorrectAnswersState = [
          { id: "2", name: "不正解のカルボナーラ", imagePath: "/" },
        ];
        const mockedCurrentMealIndexState = 9;
        const mockedSelectedMealsState = [
          { id: "1", name: "カルボナーラ", imagePath: "/" },
        ];

        const { findByText } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(correctAnswersState, mockedCorrectAnswersState);
              snapshot.set(incorrectAnswersState, mockedIncorrectAnswersState);
              snapshot.set(currentMealIndexState, mockedCurrentMealIndexState);
              snapshot.set(selectedMealsState, mockedSelectedMealsState);
            }}
          >
            <RecoilObserver
              node={correctAnswersState}
              onChange={onChangeCorrectAnswersState}
            />
            <RecoilObserver
              node={incorrectAnswersState}
              onChange={onChangeIncorrectAnswersState}
            />
            <RecoilObserver
              node={currentMealIndexState}
              onChange={onChangeCurrentMealIndexState}
            />
            <RecoilObserver
              node={selectedMealsState}
              onChange={onChangeSelectedMealsState}
            />
            <StartPage />
          </RecoilRoot>,
        );

        fireEvent.click(await findByText("プレイ"));

        expect(onChangeCorrectAnswersState).toHaveBeenCalledTimes(2);
        expect(onChangeCorrectAnswersState).toHaveBeenCalledWith(
          mockedCorrectAnswersState,
        );
        expect(onChangeCorrectAnswersState).toHaveBeenCalledWith([]);

        expect(onChangeIncorrectAnswersState).toHaveBeenCalledTimes(2);
        expect(onChangeIncorrectAnswersState).toHaveBeenCalledWith(
          mockedIncorrectAnswersState,
        );
        expect(onChangeIncorrectAnswersState).toHaveBeenCalledWith([]);

        expect(onChangeCurrentMealIndexState).toHaveBeenCalledTimes(2);
        expect(onChangeCurrentMealIndexState).toHaveBeenCalledWith(
          mockedCurrentMealIndexState,
        );
        expect(onChangeCurrentMealIndexState).toHaveBeenCalledWith(0);

        expect(onChangeSelectedMealsState).toHaveBeenCalledTimes(2);
        expect(onChangeSelectedMealsState).toHaveBeenCalledWith(
          mockedSelectedMealsState,
        );
        expect(onChangeSelectedMealsState).toHaveBeenCalledWith([
          {
            id: "1",
            name: "ランダムに選ばれたカルボナーラ",
            imagePath: "/",
          },
        ]);
      });

      test("gameStatusがPLAYINGになる", async () => {
        const onChange = vi.fn();
        const mockedState = GameStatus.START;

        const { findByText } = render(
          <RecoilRoot
            initializeState={(snapshot) =>
              snapshot.set(gameStatusState, mockedState)
            }
          >
            <RecoilObserver node={gameStatusState} onChange={onChange} />
            <StartPage />
          </RecoilRoot>,
        );

        fireEvent.click(await findByText("プレイ"));

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith(GameStatus.START);
        expect(onChange).toHaveBeenCalledWith(GameStatus.PLAYING);
      });
    });
  });
}
