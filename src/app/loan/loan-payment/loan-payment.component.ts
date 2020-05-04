import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import { Subscription, Observer, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LoanService } from "../loan.service";
import * as moment from "moment";
import { PaymentService } from "src/app/payment/payment.service";
import { SnackbarService } from "src/app/layout/snackbar.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-loan-payment",
  templateUrl: "./loan-payment.component.html",
  styleUrls: ["./loan-payment.component.scss"],
})
export class LoanPaymentComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loan: LoanService,
    private payment: PaymentService,
    private snack: SnackbarService,
    private modalService: BsModalService
  ) {}
  paymentForm: FormGroup = this.fb.group({
    amount_paid: [null, [Validators.required]],
  });

  loanPSubscription: Subscription;
  payments_notMadeSubscription: Subscription;
  payments_madeSubscription: Subscription;

  selectedPayment: Object;

  showSpinner: boolean = true;
  loanP$: Object;
  loanP_id: string;
  user_id: string;
  payments_made: Object[];
  payments_notMade: Object[];

  amount_paid: number; //MODAL
  missing_amount: number;
  total_amount_paid: number;

  ngOnInit() {
    this.loanP_id = this.route.snapshot.paramMap.get("id");
    this.loanPSubscription = this.loan
      .getLoan(this.loanP_id)
      .subscribe((loan) => {
        this.loanP$ = loan;
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

  pay() {
    this.modalRef.hide();
    let index = this.selectedPayment["index"];
    let expected_amount = this.selectedPayment["expected_amount"];

    let thereIsLowerDate = this.payments_notMade.some(
      (payment) => payment["index"] < index
    );

    if (thereIsLowerDate) {
      this.snack.bar("Aún no puede realizar este pago", "OK");
    } else {
      //Notpaid fix
      let notpaid_amount = expected_amount - this.amount_paid;
      if (notpaid_amount < 0) notpaid_amount = 0;

      //MissingAmount fix
      let missing_amount = this.missing_amount - this.amount_paid;
      if (missing_amount < 0) missing_amount = 0;

      let payment_made: Object = {
        ...this.selectedPayment,
        client_name: this.loanP$["client_name"],
        client_email: this.loanP$["client_email"],
        paid: true,
        date_paid: new Date(),
        amount_paid: this.amount_paid,
        missing_amount: missing_amount,
        total_amount_paid: this.total_amount_paid + this.amount_paid,
        notpaid_amount: notpaid_amount,
      };
      this.payment.pay(payment_made);
    }
  }

  openModal(template: TemplateRef<any>, payment) {
    this.modalRef = this.modalService.show(template);
    this.selectedPayment = payment;
  }
}
