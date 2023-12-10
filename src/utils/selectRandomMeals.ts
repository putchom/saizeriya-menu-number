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

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("selectRandomMeals", () => {
    const meals = [
      { id: "1", name: "Meal 1", imagePath: "/" },
      { id: "2", name: "Meal 2", imagePath: "/" },
      { id: "3", name: "Meal 3", imagePath: "/" },
      { id: "4", name: "Meal 4", imagePath: "/" },
      { id: "5", name: "Meal 5", imagePath: "/" },
    ];

    test("指定した個数のMealsが返る", () => {
      const selected = selectRandomMeals({ meals, quantity: 3 });
      expect(selected.length).toBe(3);
    });

    test("Mealsの中に同じMealが含まれない", () => {
      const selected = selectRandomMeals({ meals, quantity: 3 });
      expect(selected[0]).not.toBe(selected[1]);
      expect(selected[0]).not.toBe(selected[2]);
      expect(selected[1]).not.toBe(selected[2]);
    });
  });
}
