import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../../core/services/firebase.service';
import { Recipe } from '../models/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly collection = 'recipes';

  constructor(private firebaseService: FirebaseService) { }

  public get(): Observable<Recipe[]> {
    return this.firebaseService.getCollectionData<Recipe>(this.collection);
  }

  public post(recipe: Recipe): Promise<DocumentReference<Recipe>> {
    return this.firebaseService.postDocument(this.collection, recipe);
  }

  public update(recipeUpdated: Recipe): Promise<void> {
    return this.firebaseService.updateDocument(this.collection, recipeUpdated);
  }

  public delete(recipeToDelete: Recipe): Promise<void> {
    return this.firebaseService.deleteDocument(this.collection, recipeToDelete.id as string);
  }

}
