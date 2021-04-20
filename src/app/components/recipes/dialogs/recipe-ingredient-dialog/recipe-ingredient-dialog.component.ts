import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientUnits } from '../../../ingredients/models/ingredient-units.interface';
import { Ingredient } from '../../../ingredients/models/ingredient.interface';
import { RecipeIngredientDataSource } from '../../models/recipe.interface';

@Component({
  selector: 'app-recipe-ingredient-dialog',
  templateUrl: './recipe-ingredient-dialog.component.html',
  styleUrls: ['./recipe-ingredient-dialog.component.scss']
})
export class RecipeIngredientDialogComponent implements OnInit {

  public ingredientForm!: FormGroup;

  public get dataRecipeIngredient(): RecipeIngredientDataSource { return this.data?.recipeIngredient; }
  public get dataIngredients(): Ingredient[] { return this.data?.ingredients; }
  public get dataIngredientsUnits(): IngredientUnits[] { return this.data?.ingredientsUnits; }
  public get isEdit(): boolean { return this.data != null; }
  public get ingredient(): AbstractControl { return this.ingredientForm.controls.ingredient; }
  public get unit(): AbstractControl { return this.ingredientForm.controls.unit; }
  public get amount(): AbstractControl { return this.ingredientForm.controls.amount; }

  constructor(
    public dialogRef: MatDialogRef<RecipeIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      ingredient: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });

    if (this.dataRecipeIngredient) {
      this.ingredient.setValue(this.dataRecipeIngredient.ingredient);
      this.unit.setValue(this.dataRecipeIngredient.unit);
      this.amount.setValue(this.dataRecipeIngredient.amount);
    }
  }

  public onSubmit(): void {
    const toSubmit: RecipeIngredientDataSource = {
      amount: this.amount.value,
      ingredient: this.ingredient.value,
      ingredientName: this.dataIngredients.find(x => x.id === this.ingredient.value)?.name ?? '',
      price: this.dataRecipeIngredient?.price,
      unit: this.unit.value,
      unitAbbreviation: this.dataIngredientsUnits.find(x => x.id === this.unit.value)?.abbreviation ?? '',
    };

    this.dialogRef.close(toSubmit);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
