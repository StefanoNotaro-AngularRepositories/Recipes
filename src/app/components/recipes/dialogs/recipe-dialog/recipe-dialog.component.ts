import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import * as _ from 'underscore';
import { IngredientUnits } from '../../../ingredients/models/ingredient-units.interface';

import { Ingredient } from '../../../ingredients/models/ingredient.interface';
import { RecipeIngredient } from '../../models/recipe-ingredient';
import { Recipe, RecipeIngredientDataSource, RecipeViewModel } from '../../models/recipe.interface';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent implements OnInit {
  public recipeForm!: FormGroup;
  public ingredients: Ingredient[] = [];
  public ingredientsUnits: IngredientUnits[] = [];
  public displayedColumns: string[] = ['name', 'amount', 'unit', 'actions'];
  public dataSource: RecipeIngredientDataSource[] = [];

  public get name(): AbstractControl { return this.recipeForm.controls.name; }
  public get isEdit(): boolean { return this.data != null; }
  public get dataRecipe(): RecipeViewModel { return this.data?.recipe; }
  public get dataIngredients(): Ingredient[] { return this.data?.ingredients; }
  public get dataIngredientsUnits(): IngredientUnits[] { return this.data?.ingredientsUnits; }

  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createRecipeForm();

    if (this.dataIngredients) {
      this.ingredients = this.dataIngredients;
    }

    if (this.dataIngredientsUnits) {
      this.ingredientsUnits = this.dataIngredientsUnits;
    }

    if (this.dataRecipe) {
      this.dataSource = _.sortBy(this.dataRecipe.ingredientDataSource, 'ingredientName');
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.recipeForm.valid && this.dataSource.length > 0) {
      const recipePrice = this.dataSource.reduce((x, y) => x + y.price, 0);

      const toSubmit: RecipeViewModel = {
        id: this.dataRecipe?.id,
        name: this.name.value,
        price: recipePrice,
        calculatedIngredientsPrice: 0,
        ingredientDataSource: this.dataSource,
        ingredients: this.dataSource.map<RecipeIngredient>(x => {
          return {
            amount: x.amount,
            ingredient: x.ingredient,
            unit: x.unit,
          };
        }),
      };

      this.dialogRef.close(toSubmit);
    }
  }

  public onDeleteIngredient(dataRow: RecipeIngredientDataSource): void {
    this.dataSource = this.dataSource.filter(x => x.ingredient !== dataRow.ingredient);
  }

  public onAddIngredient(): void {
    const dialogRef = this.openRecipeIngredientDialog();

    dialogRef.afterClosed().subscribe((result: RecipeIngredientDataSource) => {
      if (result) {
        this.handleRecipeIngredient(result);
      }
    });
  }

  public onEditIngredient(dataRow: RecipeIngredientDataSource): void {
    const dataSourceItem = this.dataSource.find(x => x.ingredient === dataRow.ingredient);
    const dialogRef = this.openRecipeIngredientDialog(dataRow);

    dialogRef.afterClosed().subscribe((result: RecipeIngredientDataSource) => {
      if (result) {
        this.handleRecipeIngredient(result, dataSourceItem);
      }
    });
  }

  private handleRecipeIngredient(result: RecipeIngredientDataSource, dataSourceItem?: RecipeIngredientDataSource): void {
    const ingredient = this.ingredients.find(y => y.id === result.ingredient);
    const ingredientUnit = this.dataIngredientsUnits.find(y => y.id === ingredient?.unit);
    const resultUnit = this.dataIngredientsUnits.find(y => y.id === result.unit);

    this.dataSource = this.dataSource.filter(x => x.ingredient !== (dataSourceItem?.ingredient ?? result.ingredient));

    result.price = (((ingredient?.price ?? 0) / (resultUnit?.value ?? 1)) * result.amount) / (ingredientUnit?.value ?? 1);
    this.dataSource.push(result);

    this.dataSource = _.sortBy(this.dataSource, 'ingredientName');
  }

  private createRecipeForm(): void {
    this.recipeForm = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required])
    });

    if (this.data?.recipe) {
      this.recipeForm.controls.id.setValue(this.dataRecipe.id);
      this.recipeForm.controls.name.setValue(this.dataRecipe.name);
    }
  }

  private openRecipeIngredientDialog(recipeIngredient?: RecipeIngredientDataSource): MatDialogRef<RecipeIngredientDialogComponent, any> {
    return this.dialog.open(RecipeIngredientDialogComponent, {
      width: '650px',
      data: {
        recipeIngredient,
        ingredients: this.ingredients,
        ingredientsUnits: this.dataIngredientsUnits,
      }
    });
  }

}
