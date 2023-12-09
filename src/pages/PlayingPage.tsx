import { Meal } from "../types";

type PlayingPageProps = {
  currentMealIndex: number;
  selectedMeals: Meal[];
  userInput: string;
  setUserInput: (input: string) => void;
  checkAnswer: () => void;
};

const PlayingPage = (props: PlayingPageProps) => {
  const {
    currentMealIndex,
    selectedMeals,
    userInput,
    setUserInput,
    checkAnswer,
  } = props;

  return (
    <div>
      <p>{currentMealIndex + 1} / 10</p>
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
        />
        <button type="button" onClick={checkAnswer}>
          回答
        </button>{" "}
      </label>
    </div>
  );
};

export default PlayingPage;
