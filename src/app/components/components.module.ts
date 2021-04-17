import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddIngredientDialogComponent } from './ingredients/dialogs/add-ingredient-dialog/add-ingredient-dialog.component';
import { SharedModule } from '../shared/shared.module';

const componentsToImport = [
  IngredientsComponent,
  RecipesComponent,
  AddIngredientDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [componentsToImport],
  exports: []
})
export class ComponentsModule { }
