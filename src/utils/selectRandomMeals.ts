import { Meal } from "../types";

export const selectRandomMeals = (args: {
  meals: Meal[];
  quantity: number;
}) => {
  const selected: Meal[] = [];
  while (selected.length < args.quantity) {
    const randomIndex = Math.floor(Math.random() * args.meals.length);
    const meal = args.meals[randomIndex];
    if (!selected.some((item) => item.id === meal.id)) {
      selected.push(meal);
    }
  }
  return selected;
};
