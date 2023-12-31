import { StartPage } from "./pages/StartPage";
import { PlayingPage } from "./pages/PlayingPage";
import { EndPage } from "./pages/EndPage";
import { NavigationBar } from "./components/NavigationBar";
import { useRecoilValue } from "recoil";
import { GameStatus, gameStatusState } from "./states";
import { Box, Container } from "@radix-ui/themes";

const App = () => {
  const gameStatus = useRecoilValue(gameStatusState);

  return (
    <Box>
      <NavigationBar />
      <Container size="1" pt="6" pr="4" pb="6" pl="4">
        {gameStatus === GameStatus.START && <StartPage />}
        {gameStatus === GameStatus.PLAYING && <PlayingPage />}
        {gameStatus === GameStatus.END && <EndPage />}
      </Container>
    </Box>
  );
};

export default App;

if (import.meta.vitest) {
  const { afterEach, describe, test, expect } = import.meta.vitest;
  const { RecoilRoot } = await import("recoil");
  const { cleanup, render } = await import("@testing-library/react");
  const { gameStatusState } = await import("./states");

  describe("App", () => {
    afterEach(() => {
      cleanup();
    });

    test("gameStatusがSTARTのときStartPageが描画される", async () => {
      const mockedState = GameStatus.START;
      const { findByText } = render(
        <RecoilRoot
          initializeState={(snapshot) =>
            snapshot.set(gameStatusState, mockedState)
          }
        >
          <App />
        </RecoilRoot>,
      );
      expect(await findByText("はじめる")).not.toBeNull();
    });

    test("gameStatusがPLAYINGのときPlayingPageが描画される", async () => {
      const mockedState = GameStatus.PLAYING;
      const { findByText } = render(
        <RecoilRoot
          initializeState={(snapshot) =>
            snapshot.set(gameStatusState, mockedState)
          }
        >
          <App />
        </RecoilRoot>,
      );
      expect(await findByText("回答")).not.toBeNull();
    });

    test("gameStatusがENDのときEndPageが描画される", async () => {
      const mockedState = GameStatus.END;
      const { findByText } = render(
        <RecoilRoot
          initializeState={(snapshot) =>
            snapshot.set(gameStatusState, mockedState)
          }
        >
          <App />
        </RecoilRoot>,
      );
      expect(await findByText("トップに戻る")).not.toBeNull();
    });
  });
}
