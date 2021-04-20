import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';

import { LoginService } from '../../core/services/login.service';
import { Ingredient } from '../ingredients/models/ingredient.interface';
import { IngredientsService } from '../ingredients/services/ingredients.service';
import { RecipeDialogComponent } from './dialogs/recipe-dialog/recipe-dialog.component';
import { Recipe } from './models/recipe.interface';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public isLogin = false;

  public recipes: Recipe[] = [];
  public ingredients: Ingredient[] = [];

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    public recipeService: RecipeService,
    private ingredientsService: IngredientsService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.loginService.getIsLogin();

    this.ingredientsService.get().subscribe(ingredients => {
      this.ingredients = _.sortBy(ingredients, 'name');

      this.recipeService.get().subscribe(recipes => {
        this.recipes = _.sortBy(recipes, 'name');
        this.recipes.forEach(recipe => {
          const selectedIngredients = recipe.ingredients;
          recipe.ingredientsObjects = this.ingredients.filter(y => {
            return selectedIngredients.indexOf(y?.id ?? '') !== -1;
          });
        });
      });
    });
  }

  public openAddRecipeDialog(): void {
    const dialogRef = this.openRecipeDialog();

    dialogRef.afterClosed().subscribe((recipeResult: Recipe) => {
      if (recipeResult) {
        this.recipeService.post(recipeResult);
      }
    });
  }

  public deleteRecipe(recipe: Recipe): void {
    this.recipeService.delete(recipe);
  }

  public editRecipe(recipe: Recipe): void {
    const dialogRef = this.openRecipeDialog(recipe);

    dialogRef.afterClosed().subscribe((recipeResult: Recipe) => {
      if (recipeResult) {
        this.recipeService.update(recipeResult);
      }
    });
  }

  private openRecipeDialog(recipe?: Recipe): MatDialogRef<RecipeDialogComponent, any> {
    return this.dialog.open(RecipeDialogComponent, {
      width: '500px',
      data: {
        recipe,
        ingredients: this.ingredients
      }
    });
  }

}
