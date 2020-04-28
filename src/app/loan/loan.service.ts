import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { SnackbarService } from "../layout/snackbar.service";
@Injectable({
  providedIn: "root",
})
export class LoanService {
  constructor(
    private firestore: AngularFirestore,
    private snack: SnackbarService
  ) {
    this.loansCollection = this.firestore.collection("loans");
  }
  loansCollection: AngularFirestoreCollection<any>;

  addLoan(loan: Object) {
    this.snack.bar("Préstamo creado exitosamente", "OK");
    this.firestore.collection("loans").add(loan);
  }

  getLoans(client_id: string) {
    return this.firestore
      .collection("loans", (ref) => ref.where("client_id", "==", client_id))
      .valueChanges({ idField: "loan_id" });
  }

  
}
