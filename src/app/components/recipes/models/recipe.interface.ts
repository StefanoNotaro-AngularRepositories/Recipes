import { Ingredient } from '../../ingredients/models/ingredient.interface';

export interface Recipe {
    id?: string;
    name: string;
    price: number;
    ingredients: Ingredient[];
}
