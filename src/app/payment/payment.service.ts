import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { SnackbarService } from "../layout/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(
    private firestore: AngularFirestore,
    private snack: SnackbarService
  ) {}

  getAllPayments(user_id: string) {
    return this.firestore
      .collection("payments", (ref) => ref.where("user_id", "==", user_id))
      .valueChanges({ idField: "payment_id" });
  }

  getPayment(payment_id: string) {
    return this.firestore.collection("payments").doc(payment_id).valueChanges();
  }

  returnPayment(index, loan_id) {
    return this.firestore
      .collection("payments", (ref) =>
        ref.where("loan_id", "==", loan_id).where("index", "==", index)
      )
      .valueChanges({ idField: "payment_id" });
  }

  pay(payment, loan, loan_id) {
    let payment_id = this.firestore.createId();
    this.firestore.collection("payments").doc(payment_id).set(payment);
    this.firestore.collection("loans").doc(loan_id).update(loan);
  }
}
