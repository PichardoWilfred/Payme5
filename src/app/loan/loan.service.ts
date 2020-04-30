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
    let id: string = this.firestore.createId();
    this.firestore.collection("loans").doc(id).set(loan);
    this.firestore
      .collection("clients")
      .doc(loan["client_id"])
      .update({ active_loan: true, loan_id: id });
    this.snack.bar("Préstamo creado exitosamente", "OK");
  }

  getLoans(user_id: string) {
    return this.firestore
      .collection("loans", (ref) => ref.where("user_id", "==", user_id))
      .valueChanges({ idField: "loan_id" });
  }

  getLoan(loan_id: string) {
    return this.firestore.collection("loans").doc(loan_id).valueChanges();
  }

  cancelLoan(loan: Object, loan_id: string) {
    this.firestore
      .collection("loans")
      .doc(loan_id)
      .update({ active: false });

    this.firestore
      .collection("clients")
      .doc(loan["client_id"])
      .update({ active_loan: false, loan_id: "" });
  }
}
