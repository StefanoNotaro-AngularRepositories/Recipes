import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  protected collectionName = '';

  constructor(private firestore: AngularFirestore) { }

  public getCollectionData<T>(collectionName: string): Observable<T[]> {
    const collection = this.firestore.collection<T>(`${collectionName}`);

    return collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          return { id, ...data } as T;
        });
      })
    );
  }

  public postDocument<T>(collectionName: string, data: T): Promise<DocumentReference<T>> {
    return this.firestore.collection<T>(`${collectionName}`).add(data);
  }

  public updateDocument<T>(collectionName: string, documentUpdated: T): Promise<void> {
    return this.firestore.collection(`${collectionName}`).doc((documentUpdated as any).id).update(documentUpdated);
  }

  public deleteDocument(collectionName: string, documentId: string): Promise<void> {
    return this.firestore.collection(`${collectionName}`).doc(documentId).delete();
  }

}
