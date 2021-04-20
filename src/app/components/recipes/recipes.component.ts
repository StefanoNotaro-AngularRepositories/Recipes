import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'underscore';

import { LoginService } from '../../core/services/login.service';
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

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    public recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.loginService.getIsLogin();

    this.recipeService.get().subscribe(x => {
      this.recipes = _.sortBy(x, 'name');
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
      data: recipe
    });
  }

}
