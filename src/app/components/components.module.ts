import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { IngredientDialogComponent } from './ingredients/dialogs/ingredient-dialog/ingredient-dialog.component';
import { SharedModule } from '../shared/shared.module';

const componentsToImport = [
  IngredientsComponent,
  RecipesComponent,
  IngredientDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [componentsToImport, IngredientDialogComponent],
  exports: [IngredientDialogComponent]
})
export class ComponentsModule { }
