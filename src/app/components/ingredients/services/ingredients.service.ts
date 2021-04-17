import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../../core/services/firebase.service';
import { Ingredient } from '../models/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private readonly collection = 'ingredients';

  constructor(private firebaseService: FirebaseService) { }

  public get(): Observable<Ingredient[]> {
    return this.firebaseService.getCollectionData<Ingredient>(this.collection);
  }

  public post(ingredient: Ingredient): Promise<DocumentReference<Ingredient>> {
    return this.firebaseService.postDocument(this.collection, ingredient);
  }

  public update(ingredientUpdated: Ingredient): Promise<void> {
    return this.firebaseService.updateDocument(this.collection, ingredientUpdated);
  }

  public delete(ingredientToDelete: Ingredient): Promise<void> {
    return this.firebaseService.deleteDocument(this.collection, ingredientToDelete.id as string);
  }

}
