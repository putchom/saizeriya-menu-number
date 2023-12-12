import { Meal } from "../types";

export const getGrade = (correctAnswers: Meal[], incorrectAnswers: Meal[]) => {
  const correctAnswersCount = correctAnswers.length;
  const incorrectAnswersCount = incorrectAnswers.length;
  const totalAnswersCount = correctAnswersCount + incorrectAnswersCount;
  const correctAnswersRate = correctAnswersCount / totalAnswersCount;

  if (correctAnswersRate >= 1) {
    return "サイゼ狂い";
  }

  if (correctAnswersRate >= 0.8) {
    return "歩くサイゼのメニュー";
  }

  if (correctAnswersRate >= 0.6) {
    return "エリートサイゼリヤン";
  }

  if (correctAnswersRate >= 0.4) {
    return "サイゼのバイトリーダー";
  }

  if (correctAnswersRate >= 0.2) {
    return "サイゼがちょっと好きな人";
  }

  return "サイゼの素人";
};

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("getGrade", () => {
    test("全問正解ならサイゼ狂い", () => {
      const correctAnswers = [
        { id: "1", name: "Meal 1", imagePath: "/" },
        { id: "2", name: "Meal 2", imagePath: "/" },
        { id: "3", name: "Meal 3", imagePath: "/" },
        { id: "4", name: "Meal 4", imagePath: "/" },
        { id: "5", name: "Meal 5", imagePath: "/" },
        { id: "6", name: "Meal 6", imagePath: "/" },
      ];
      const incorrectAnswers: Meal[] = [];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe("サイゼ狂い");
    });

    test("5問正解なら歩くサイゼのメニュー", () => {
      const correctAnswers = [
        { id: "1", name: "Meal 1", imagePath: "/" },
        { id: "2", name: "Meal 2", imagePath: "/" },
        { id: "3", name: "Meal 3", imagePath: "/" },
        { id: "4", name: "Meal 4", imagePath: "/" },
        { id: "5", name: "Meal 5", imagePath: "/" },
      ];
      const incorrectAnswers = [{ id: "6", name: "Meal 6", imagePath: "/" }];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe(
        "歩くサイゼのメニュー",
      );
    });

    test("4問正解ならエリートサイゼリヤン", () => {
      const correctAnswers = [
        { id: "1", name: "Meal 1", imagePath: "/" },
        { id: "2", name: "Meal 2", imagePath: "/" },
        { id: "3", name: "Meal 3", imagePath: "/" },
        { id: "4", name: "Meal 4", imagePath: "/" },
      ];
      const incorrectAnswers = [
        { id: "5", name: "Meal 5", imagePath: "/" },
        { id: "6", name: "Meal 6", imagePath: "/" },
      ];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe(
        "エリートサイゼリヤン",
      );
    });

    test("3問正解ならサイゼのバイトリーダー", () => {
      const correctAnswers = [
        { id: "1", name: "Meal 1", imagePath: "/" },
        { id: "2", name: "Meal 2", imagePath: "/" },
        { id: "3", name: "Meal 3", imagePath: "/" },
      ];
      const incorrectAnswers = [
        { id: "4", name: "Meal 4", imagePath: "/" },
        { id: "5", name: "Meal 5", imagePath: "/" },
        { id: "6", name: "Meal 6", imagePath: "/" },
      ];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe(
        "サイゼのバイトリーダー",
      );
    });

    test("2問正解なら", () => {
      const correctAnswers = [
        { id: "1", name: "Meal 1", imagePath: "/" },
        { id: "2", name: "Meal 2", imagePath: "/" },
      ];
      const incorrectAnswers = [
        { id: "3", name: "Meal 3", imagePath: "/" },
        { id: "4", name: "Meal 4", imagePath: "/" },
        { id: "5", name: "Meal 5", imagePath: "/" },
        { id: "6", name: "Meal 6", imagePath: "/" },
      ];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe(
        "サイゼがちょっと好きな人",
      );
    });

    test("1問正解なら", () => {
      const correctAnswers = [{ id: "1", name: "Meal 1", imagePath: "/" }];
      const incorrectAnswers = [
        { id: "2", name: "Meal 2", imagePath: "/" },
        { id: "3", name: "Meal 3", imagePath: "/" },
        { id: "4", name: "Meal 4", imagePath: "/" },
        { id: "5", name: "Meal 5", imagePath: "/" },
        { id: "6", name: "Meal 6", imagePath: "/" },
      ];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe("サイゼの素人");
    });

    test("全問不正解ならサイゼの素人", () => {
      const correctAnswers: Meal[] = [];
      const incorrectAnswers = [
        { id: "1", name: "Meal 1", imagePath: "/" },
        { id: "2", name: "Meal 2", imagePath: "/" },
        { id: "3", name: "Meal 3", imagePath: "/" },
        { id: "4", name: "Meal 4", imagePath: "/" },
        { id: "5", name: "Meal 5", imagePath: "/" },
      ];
      expect(getGrade(correctAnswers, incorrectAnswers)).toBe("サイゼの素人");
    });
  });
}
