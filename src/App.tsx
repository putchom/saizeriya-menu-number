import "./App.css";
import { StartPage } from "./pages/StartPage";
import { PlayingPage } from "./pages/PlayingPage";
import { EndPage } from "./pages/EndPage";
import { NavigationBar } from "./components/NavigationBar";
import { useRecoilValue } from "recoil";
import { GameStatus, gameStatusState } from "./states/gameStatusState";

const App = () => {
  const gameStatus = useRecoilValue(gameStatusState);

  return (
    <div>
      <NavigationBar />
      {gameStatus === GameStatus.START && <StartPage />}
      {gameStatus === GameStatus.PLAYING && <PlayingPage />}
      {gameStatus === GameStatus.END && <EndPage />}
    </div>
  );
};

export default App;
