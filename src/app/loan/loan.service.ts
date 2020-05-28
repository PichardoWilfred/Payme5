import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { SnackbarService } from "../layout/snackbar.service";
import { PaymentService } from "../payment/payment.service";
@Injectable({
  providedIn: "root",
})
export class LoanService {
  constructor(
    private firestore: AngularFirestore,
    private snack: SnackbarService,
    private payment: PaymentService
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
    loan["payment_dates"].forEach((payment) => {
      payment["loan_id"] = id;
    });
    // this.payment.addPayments(loan["payment_dates"]);
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

  disableLoan(
    client_id: string,
    loan_id: string,
    completed: boolean,
    cancel_reason: string
  ) {
    if (completed) {
      this.firestore.collection("loans").doc(loan_id).update({ active: false });
    } else {
      this.firestore
        .collection("loans")
        .doc(loan_id)
        .update({
          active: false,
          state: "canceled",
          cancel_reason: cancel_reason,
        });
    }

    this.firestore
      .collection("clients")
      .doc(client_id)
      .update({ active_loan: false, loan_id: "" });
  }

  firstCheckDone(id) {
    this.firestore.collection("loans").doc(id).update({ firstCheck: false });
  }
}
