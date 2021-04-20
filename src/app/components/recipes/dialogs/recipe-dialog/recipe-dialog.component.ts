import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent implements OnInit {
  public recipeForm!: FormGroup;

  public get name(): AbstractControl { return this.recipeForm.controls.name; }
  public get isEdit(): boolean { return this.data != null; }

  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.createRecipeForm();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.recipeForm.valid) {
      this.dialogRef.close(this.recipeForm.value);
    }
  }

  private createRecipeForm(): void {
    this.recipeForm = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
    });

    if (this.data) {
      this.recipeForm.controls.id.setValue(this.data.id);
      this.recipeForm.controls.name.setValue(this.data.name);
    }
  }

}
