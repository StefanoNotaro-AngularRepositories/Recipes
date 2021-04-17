import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIngredientDialogComponent } from './dialogs/add-ingredient-dialog/add-ingredient-dialog.component';
import { Ingredient } from './models/ingredient.viewmodel';
import { IngredientsService } from './services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public ingredientsVM: Ingredient[] = [];

  constructor(private ingredientsService: IngredientsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ingredientsService.get().subscribe(ingredients => {
      this.ingredientsVM = ingredients as Ingredient[];
    });
  }

  public openAddIngredientDialog(): void {
    const dialogRef = this.dialog.open(AddIngredientDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(x => {
      console.log(x);
    });
  }

}
