export interface NutrientInfo {
  amount: number;
  unit: string;
  calories: number;
}

export interface IngredientNutrition {
  protein: NutrientInfo;
  fat: NutrientInfo;
  carbohydrate: NutrientInfo;
}

export interface CalorieBreakdown {
  [ingredient: string]: IngredientNutrition;
}

export interface Diary {
  id: string;
  content: string;
  imageUrl: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalCalories: number;
  calorieBreakdown: CalorieBreakdown;
}

export interface DiaryFilters {
  startDate: string;
  endDate: string;
}
