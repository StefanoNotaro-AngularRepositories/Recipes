import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';

const componentsToImport = [
  IngredientsComponent,
  RecipesComponent,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [componentsToImport],
  exports: []
})
export class ComponentsModule { }
