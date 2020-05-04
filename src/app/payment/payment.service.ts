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

  addPayments(payments: Object[]) {
    payments.forEach((payment) => {
      this.firestore.collection("payments").add(payment);
    });
  }

  getPayments(loan_id: string, paid: boolean) {
    return this.firestore
      .collection("payments", (ref) =>
        ref
          .where("loan_id", "==", loan_id)
          .where("paid", "==", paid)
          .orderBy("index")
      )
      .valueChanges({ idField: "payment_id" });
  }

  pay(payment) {
    const {
      loan_id,
      payment_id,
      missing_amount,
      total_amount_paid,
    } = payment;
    this.firestore.collection("payments").doc(payment_id).set(payment);
    this.firestore
      .collection("loans")
      .doc(loan_id)
      .update({
        total_amount_paid: total_amount_paid,
        missing_amount: missing_amount,
      });
  }
}
