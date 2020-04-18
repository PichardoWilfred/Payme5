import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class LoanService {
  constructor(private firestore: AngularFirestore) {
    this.loansCollection = firestore.collection("prestamos", (prestamos) =>
      prestamos.limit(5)
    );
  }
  loansCollection: AngularFirestoreCollection;
  getLoans() {
    return this.loansCollection.valueChanges();
  }
}
