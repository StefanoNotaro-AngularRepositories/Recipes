import { RecipeIngredient } from './recipe-ingredient';

export interface Recipe {
    id?: string;
    name: string;
    price: number;
    ingredients: RecipeIngredient[];
}

export interface RecipeViewModel extends Recipe {
    calculatedIngredientsPrice: number;
    ingredientDataSource: RecipeIngredientDataSource[];
}

export interface RecipeIngredientDataSource {
    ingredient: string;
    ingredientName: string;
    unit: string;
    unitAbbreviation: string;
    amount: number;
    price: number;
}
