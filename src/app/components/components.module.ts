import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { IngredientDialogComponent } from './ingredients/dialogs/ingredient-dialog/ingredient-dialog.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeDialogComponent } from './recipes/dialogs/recipe-dialog/recipe-dialog.component';
import { RecipeIngredientDialogComponent } from './recipes/dialogs/recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import { RecipesComponent } from './recipes/recipes.component';

const componentsToImport = [
  IngredientsComponent,
  RecipesComponent,
  IngredientDialogComponent,
  RecipeDialogComponent,
  RecipeIngredientDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [componentsToImport],
  exports: [IngredientDialogComponent, RecipeIngredientDialogComponent]
})
export class ComponentsModule { }
