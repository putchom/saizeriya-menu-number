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
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { getGrade } from "../utils/getGrade";

export const EndPage: React.FC = () => {
  const correctAnswers = useRecoilValue(correctAnswersState);
  const incorrectAnswers = useRecoilValue(incorrectAnswersState);
  const setGameStatus = useSetRecoilState(gameStatusState);

  const getResult = () => {
    return `${NUMBER_OF_QUESTIONS}問中${
      correctAnswers.length
    }問正解しました！あなたは${getGrade(
      correctAnswers,
      incorrectAnswers,
    )}です！`;
  };

  const tweetScore = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${getResult()} #サイゼのメニュー番号 https://saizeriya-menu-number.vercel.app/`,
    )}`;
    window.open(tweetUrl, "_blank");
  };

  const backToTop = () => {
    setGameStatus(GameStatus.START);
  };

  return (
    <Flex direction="column" gap="6">
      <Text as="p" weight="bold" size="6">
        {getResult()}
      </Text>
      <Flex direction="column" gap="2">
        <Button type="button" onClick={tweetScore} size="3">
          結果をツイート
        </Button>
        <Button type="button" onClick={backToTop} size="3" variant="outline">
          トップに戻る
        </Button>
      </Flex>
      <Flex direction="column" gap="4">
        <Heading as="h2" size="6">
          正解
        </Heading>
        {correctAnswers.length === 0 ? (
          <Text as="p" data-testid="correct-answers-empty-state" color="gray">
            なし
          </Text>
        ) : (
          <Flex direction="column" data-testid="corect-answers-list" gap="4">
            {correctAnswers.map((item) => (
              <AnswerListItem key={item.id} meal={item} />
            ))}
          </Flex>
        )}
      </Flex>
      <Flex direction="column" gap="4">
        <Heading as="h2" size="6">
          不正解
        </Heading>
        {incorrectAnswers.length === 0 ? (
          <Text as="p" data-testid="incorrect-answers-empty-state" color="gray">
            なし
          </Text>
        ) : (
          <Flex direction="column" data-testid="incorect-answers-list" gap="4">
            {incorrectAnswers.map((item) => (
              <AnswerListItem key={item.id} meal={item} />
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

if (import.meta.vitest) {
  const { afterEach, beforeEach, describe, test, expect, vi } = import.meta
    .vitest;
  const { RecoilRoot } = await import("recoil");
  const { cleanup, render, fireEvent } = await import("@testing-library/react");
  const { RecoilObserver } = await import("../utils/RecoilObserver");

  describe("EndPage", () => {
    afterEach(() => {
      cleanup();
    });

    describe("結果をツイートボタンを押したとき", () => {
      let originalWindowOpen: ((
        url?: string | URL | undefined,
        target?: string | undefined,
        features?: string | undefined,
      ) => Window | null) &
        ((
          url?: string | URL | undefined,
          target?: string | undefined,
          features?: string | undefined,
        ) => Window | null);

      beforeEach(() => {
        originalWindowOpen = window.open;
        window.open = vi.fn();
      });

      afterEach(() => {
        window.open = originalWindowOpen;
      });

      test("正しいURLのツイート画面が開く", async () => {
        const { findByText } = render(
          <RecoilRoot>
            <EndPage />
          </RecoilRoot>,
        );

        fireEvent.click(await findByText("結果をツイート"));

        expect(window.open).toHaveBeenCalledWith(
          "https://twitter.com/intent/tweet?text=6%E5%95%8F%E4%B8%AD0%E9%96%80%E6%AD%A3%E8%A7%A3%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AF%E3%82%B5%E3%82%A4%E3%82%BC%E3%81%AE%E7%B4%A0%E4%BA%BA%0A%20%20%E3%81%A7%E3%81%99%EF%BC%81%20%23%E3%82%B5%E3%82%A4%E3%82%BC%E3%81%AE%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E7%95%AA%E5%8F%B7%20https%3A%2F%2Fsaizeriya-menu-number.vercel.app%2F",
          "_blank",
        );
      });
    });

    describe("トップに戻るボタンを押したとき", () => {
      test("ゲームの状態がSTARTになる", async () => {
        const onChange = vi.fn();

        const { findByText } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(gameStatusState, GameStatus.END);
            }}
          >
            <RecoilObserver node={gameStatusState} onChange={onChange} />
            <EndPage />
          </RecoilRoot>,
        );

        fireEvent.click(await findByText("トップに戻る"));

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith(GameStatus.END);
        expect(onChange).toHaveBeenCalledWith(GameStatus.START);
      });
    });

    describe("正解がないとき", () => {
      test("正解の下になしと表示される", async () => {
        const { getByTestId } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(correctAnswersState, []);
            }}
          >
            <EndPage />
          </RecoilRoot>,
        );

        expect(getByTestId("correct-answers-empty-state")).toBeInTheDocument();
      });
    });

    describe("正解があるとき", () => {
      test("正解の下に正解の一覧が表示される", async () => {
        const { getByTestId } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(correctAnswersState, [
                {
                  id: "1",
                  name: "ミラノ風ドリア",
                  imagePath: "https://example.com/image.png",
                },
              ]);
            }}
          >
            <EndPage />
          </RecoilRoot>,
        );

        expect(getByTestId("corect-answers-list")).toBeInTheDocument();
      });
    });

    describe("不正解がないとき", () => {
      test("不正解の下になしと表示される", async () => {
        const { getByTestId } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(incorrectAnswersState, []);
            }}
          >
            <EndPage />
          </RecoilRoot>,
        );

        expect(
          getByTestId("incorrect-answers-empty-state"),
        ).toBeInTheDocument();
      });
    });

    describe("不正解があるとき", () => {
      test("不正解の下に不正解の一覧が表示される", async () => {
        const { getByTestId } = render(
          <RecoilRoot
            initializeState={(snapshot) => {
              snapshot.set(incorrectAnswersState, [
                {
                  id: "1",
                  name: "ミラノ風ドリア",
                  imagePath: "https://example.com/image.png",
                },
              ]);
            }}
          >
            <EndPage />
          </RecoilRoot>,
        );

        expect(getByTestId("incorect-answers-list")).toBeInTheDocument();
      });
    });
  });
}
