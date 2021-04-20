import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'underscore';

import { LoginService } from '../../core/services/login.service';
import { IngredientUnits } from '../ingredients/models/ingredient-units.interface';
import { Ingredient } from '../ingredients/models/ingredient.interface';
import { IngredientsUnitsService } from '../ingredients/services/ingredients-units.service';
import { IngredientsService } from '../ingredients/services/ingredients.service';
import { RecipeDialogComponent } from './dialogs/recipe-dialog/recipe-dialog.component';
import { Recipe, RecipeIngredientDataSource, RecipeViewModel } from './models/recipe.interface';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public isLogin = false;
  public displayedColumns: string[] = ['name', 'amount', 'price'];

  public apiRecipes: Recipe[] = [];
  public recipesVM: RecipeViewModel[] = [];
  public ingredients: Ingredient[] = [];
  public ingredientUnits: IngredientUnits[] = [];

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    public recipeService: RecipeService,
    private ingredientsService: IngredientsService,
    private ingredientsUnitsService: IngredientsUnitsService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.loginService.getIsLogin();

    this.ingredientsUnitsService.get().subscribe(ingredientUnits => {
      this.ingredientUnits = _.sortBy(ingredientUnits, 'name');
      this.ingredientsService.get().subscribe(ingredients => {
        this.ingredients = _.sortBy(ingredients, 'name');

        this.recipeService.get().subscribe(recipes => {
          this.apiRecipes = _.sortBy(recipes, 'name');

          this.configureRecipesViewModel();
        });
      });
    });
  }

  private configureRecipesViewModel(): void {
    this.recipesVM = this.apiRecipes.map<RecipeViewModel>(apiRecipe => {
      const result: RecipeViewModel = {
        ingredients: apiRecipe.ingredients,
        name: apiRecipe.name,
        price: apiRecipe.price,
        id: apiRecipe.id,
        ingredientDataSource: this.getRecipeIngredientsDataSource(apiRecipe),
        calculatedIngredientsPrice: 0
      };
      result.calculatedIngredientsPrice = result.ingredientDataSource.reduce((x, y) => x + y.price, 0);

      return result;
    });
  }

  private getRecipeIngredientsDataSource(recipe: Recipe): RecipeIngredientDataSource[] {
    let result = recipe.ingredients.map(x => {
      const ingredient = this.ingredients.find(y => y.id === x.ingredient);
      const ingredientUnit = this.ingredientUnits.find(y => y.id === ingredient?.unit);
      const resultIngredientUnit = this.ingredientUnits.find(y => y.id === x.unit);

      const resultIngredientPrice = (((ingredient?.price ?? 0) / (resultIngredientUnit?.value ?? 1)) * x.amount) / (ingredientUnit?.value ?? 1);

      return {
        ingredient: x.ingredient,
        amount: x.amount,
        ingredientName: ingredient?.name ?? '',
        unitAbbreviation: resultIngredientUnit?.abbreviation ?? '',
        unit: resultIngredientUnit?.id ?? '',
        price: resultIngredientPrice,
      } as RecipeIngredientDataSource;
    });

    result = result.filter(x => x.ingredient);

    return result.length > 0 ? result : [];
  }

  public deleteRecipe(recipe: RecipeViewModel): void {
    this.recipeService.delete(recipe);
  }

  public openAddRecipeDialog(): void {
    const dialogRef = this.openRecipeDialog();

    dialogRef.afterClosed().subscribe((recipeResult: RecipeViewModel) => {
      if (recipeResult) {
        const toSubmit: Recipe = {
          ingredients: recipeResult.ingredients,
          name: recipeResult.name,
          price: recipeResult.price
        };

        this.recipeService.post(toSubmit);
      }
    });
  }

  public editRecipe(recipe: RecipeViewModel): void {
    const dialogRef = this.openRecipeDialog(recipe);

    dialogRef.afterClosed().subscribe((recipeResult: RecipeViewModel) => {
      if (recipeResult) {
        const toSubmit: Recipe = {
          ingredients: recipeResult.ingredients,
          name: recipeResult.name,
          price: recipeResult.price,
          id: recipeResult.id
        };

        this.recipeService.update(toSubmit);
      }
    });
  }

  private openRecipeDialog(recipe?: RecipeViewModel): MatDialogRef<RecipeDialogComponent, any> {
    return this.dialog.open(RecipeDialogComponent, {
      width: '650px',
      data: {
        recipe,
        ingredients: this.ingredients,
        ingredientsUnits: this.ingredientUnits,
      }
    });
  }

}
