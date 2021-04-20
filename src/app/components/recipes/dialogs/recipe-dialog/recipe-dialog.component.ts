import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'underscore';

import { Ingredient } from '../../../ingredients/models/ingredient.interface';
import { Recipe } from '../../models/recipe.interface';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent implements OnInit {
  public recipeForm!: FormGroup;
  public ingredients: Ingredient[] = [];

  public get name(): AbstractControl { return this.recipeForm.controls.name; }
  public get formIngredients(): AbstractControl { return this.recipeForm.controls.ingredients; }
  public get isEdit(): boolean { return this.data != null; }

  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createRecipeForm();

    if (this.data?.ingredients) {
      this.ingredients = this.data.ingredients;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value as Recipe;
      const selectedIngredients = this.recipeForm.controls.ingredients.value as string[];
      const ingredients = this.ingredients.filter(x => {
        return selectedIngredients.indexOf(x?.id ?? '') !== -1;
      });

      formValue.price = ingredients.reduce((x, y) => x + y.price, 0);
      this.dialogRef.close(formValue);
    }
  }

  private createRecipeForm(): void {
    this.recipeForm = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
    });

    if (this.data?.recipe) {
      this.recipeForm.controls.id.setValue(this.data.recipe.id);
      this.recipeForm.controls.name.setValue(this.data.recipe.name);
      this.recipeForm.controls.ingredients.setValue(this.data.recipe.ingredients);
    }
  }

}
