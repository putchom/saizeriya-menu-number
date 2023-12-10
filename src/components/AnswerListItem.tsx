import { Meal } from "../types";

type AnswerListItemProps = {
  meal: Meal;
};

export const AnswerListItem: React.FC<AnswerListItemProps> = (props) => {
  const { meal } = props;

  return (
    <li key={meal.id}>
      <img src={meal.imagePath} alt={`ID: ${meal.id}`} width="100" />
      <p>{meal.name}</p>
      <p>{meal.id}</p>
    </li>
  );
};
