import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observer, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LoanService } from "../loan.service";

import * as moment from "moment";
import { PaymentService } from "src/app/payment/payment.service";
import { SnackbarService } from "src/app/layout/snackbar.service";
@Component({
  selector: "app-loan-payment",
  templateUrl: "./loan-payment.component.html",
  styleUrls: ["./loan-payment.component.scss"],
})
export class LoanPaymentComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private loan: LoanService,
    private payment: PaymentService,
    private snack: SnackbarService
  ) {}
  loanPSubscription: Subscription;
  payments_notMadeSubscription: Subscription;
  payments_madeSubscription: Subscription;

  showSpinner: boolean = true;
  loanP$: Object;
  loanP_id: string;
  user_id: string;
  payments_made: Object[];
  payments_notMade: Object[];

  amount_paid: number = 500; //MODAL
  missing_amount: number;
  total_amount_paid: number;

  ngOnInit() {
    this.loanP_id = this.route.snapshot.paramMap.get("id");
    this.loanPSubscription = this.loan
      .getLoan(this.loanP_id)
      .subscribe((loan) => {
        this.loanP$ = loan;
        this.amount_paid = loan["amount_paid"];
        this.missing_amount = loan["missing_amount"];
        this.total_amount_paid = loan["total_amount_paid"];

        this.payments_notMadeSubscription = this.payment
          .getPayments(this.loanP_id, false)
          .subscribe((payments) => {
            this.payments_notMade = payments;

            this.payments_madeSubscription = this.payment
              .getPayments(this.loanP_id, true)
              .subscribe((payments) => {
                this.payments_made = payments;
                this.showSpinner = false;
              });
          });
      });
  }
  ngOnDestroy() {
    this.loanPSubscription.unsubscribe();
  }

  pay(payment) {
    const { index, payment_id, loan_id, fee_payment } = payment;

    let thereIsLowerDate = this.payments_notMade.some(
      (payment) => payment["index"] < index
    );

    if (thereIsLowerDate) {
      this.snack.bar("Aún no puede realizar este pago", "OK");
    } else {
      //Updating the Payment
      let payment_made: Object = {
        ...payment,
        paid: true,
        date_paid: new Date(),
        amount_paid: 500,
        missing_amount: this.missing_amount - this.amount_paid,
        total_amount_paid: this.total_amount_paid + this.amount_paid,
        notpaid_amount: fee_payment - this.amount_paid,
      };

      this.payment.pay(payment_made);
    }
  }
}
