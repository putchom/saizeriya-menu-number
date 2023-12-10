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
      <p>
        結果: {NUMBER_OF_QUESTIONS}問中 {correctAnswers.length}問正解
      </p>
      <button type="button" onClick={tweetScore}>
        結果をツイート
      </button>
      <button type="button" onClick={backToTop}>
        トップに戻る
      </button>
      <div>
        <div>
          <h2>正解</h2>
          {correctAnswers.length === 0 ? (
            <p data-testid="correct-answers-empty-state">なし</p>
          ) : (
            <ul data-testid="corect-answers-list">
              {correctAnswers.map((item) => (
                <AnswerListItem key={item.id} meal={item} />
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2>不正解</h2>
          {incorrectAnswers.length === 0 ? (
            <p data-testid="incorrect-answers-empty-state">なし</p>
          ) : (
            <ul data-testid="incorect-answers-list">
              {incorrectAnswers.map((item) => (
                <AnswerListItem key={item.id} meal={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
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

    test("正解数に応じた結果が表示される", async () => {
      const { findByText } = render(
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

      expect(await findByText("結果: 10問中 1問正解")).toBeInTheDocument();
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
          "https://twitter.com/intent/tweet?text=%E3%82%B5%E3%82%A4%E3%82%BC%E3%81%AE%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E7%95%AA%E5%8F%B7%E3%82%92%2010%E5%95%8F%E4%B8%AD%200%20%E5%95%8F%E5%BD%93%E3%81%A6%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%20%23%E3%82%B5%E3%82%A4%E3%82%BC%E3%81%AE%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E7%95%AA%E5%8F%B7",
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
