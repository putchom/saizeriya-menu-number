import { Meal } from "../types";

type AnswerListItemProps = {
  meal: Meal;
};

const AnswerListItem = (props: AnswerListItemProps) => {
  const { meal } = props;

  return (
    <li key={meal.id}>
      <img src={meal.imagePath} alt={`ID: ${meal.id}`} width="100" />
      <p>{meal.name}</p>
      <p>{meal.id}</p>
    </li>
  );
};

export default AnswerListItem;
