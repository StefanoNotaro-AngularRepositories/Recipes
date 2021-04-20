import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'underscore';

import { LoginService } from '../../core/services/login.service';
import { IngredientDialogComponent } from './dialogs/ingredient-dialog/ingredient-dialog.component';
import { IngredientUnits } from './models/ingredient-units.interface';
import { Ingredient } from './models/ingredient.interface';
import { IngredientsUnitsService } from './services/ingredients-units.service';
import { IngredientsService } from './services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public ingredientUnits: IngredientUnits[] = [];
  public ingredients: Ingredient[] = [];
  public isLogin = false;

  constructor(
    private ingredientsService: IngredientsService,
    private ingredientsUnitsService: IngredientsUnitsService,
    public dialog: MatDialog,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.ingredientsService.get().subscribe(ingredients => {
      this.ingredients = _.sortBy(ingredients, 'name');
    });

    this.ingredientsUnitsService.get().subscribe(x => {
      this.ingredientUnits = x;
    });

    this.isLogin = this.loginService.getIsLogin();
  }

  public getIngredientUnitAbbreviation(ingredient: Ingredient): string {
    return this.ingredientUnits.find(x => x.id === ingredient.unit)?.abbreviation ?? '';
  }

  public getIngredientUnitName(ingredient: Ingredient): string {
    return this.ingredientUnits.find(x => x.id === ingredient.unit)?.name ?? '';
  }

  public openAddIngredientDialog(): void {
    const dialogRef = this.openIngredientDialog();

    dialogRef.afterClosed().subscribe((ingredientResult: Ingredient) => {
      if (ingredientResult) {
        this.ingredientsService.post(ingredientResult);
      }
    });
  }

  public deleteIngredient(ingredient: Ingredient): void {
    this.ingredientsService.delete(ingredient);
  }

  public editIngredient(ingredient: Ingredient): void {
    const dialogRef = this.openIngredientDialog(ingredient);

    dialogRef.afterClosed().subscribe((ingredientResult: Ingredient) => {
      if (ingredientResult) {
        this.ingredientsService.update(ingredientResult);
      }
    });
  }

  private openIngredientDialog(ingredient?: Ingredient): MatDialogRef<IngredientDialogComponent, any> {
    return this.dialog.open(IngredientDialogComponent, {
      width: '500px',
      data: ingredient
    });
  }

}
