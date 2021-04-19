import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../core/services/login.service';
import { IngredientDialogComponent } from './dialogs/ingredient-dialog/ingredient-dialog.component';
import { Ingredient } from './models/ingredient.interface';
import { IngredientsService } from './services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public ingredients: Ingredient[] = [];
  public isLogin = false;

  constructor(
    private ingredientsService: IngredientsService,
    public dialog: MatDialog,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.ingredientsService.get().subscribe(ingredients => {
      this.ingredients = ingredients as Ingredient[];
    });

    this.isLogin = this.loginService.getIsLogin();
  }

  public openAddIngredientDialog(): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

}
