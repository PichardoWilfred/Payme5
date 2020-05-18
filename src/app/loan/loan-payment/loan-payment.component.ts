import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import { Subscription, Observer, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { LoanService } from "../loan.service";
import { PaymentService } from "src/app/payment/payment.service";
import { SnackbarService } from "src/app/layout/snackbar.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import "moment/locale/es";

@Component({
  selector: "app-loan-payment",
  templateUrl: "./loan-payment.component.html",
  styleUrls: ["./loan-payment.component.scss"],
})
export class LoanPaymentComponent implements OnInit {
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
  ngOnInit() {
    this.loan_id = this.route.snapshot.paramMap.get("id");
    this.Ogloan = this.loan.getLoan(this.loan_id);
    this.Ogloan.subscribe((loan) => {
      this.showSpinner = false;
      this.loan$ = loan;
      this.payments_date = loan["payment_dates"];
      this.checkIfCompleted(loan);
    });
  }
  showThesePayments: boolean = false;
  payments_made: Observable<Object[]>;
  showSpinner: boolean = true;
  loan_completed: boolean;

  loan$: Object;
  Ogloan: Observable<Object>;
  loan_id: string;

  payments_date: Object[];
  amount_paid: number;

  pay(loan) {
    let { fee_payment, extra_amount, total_payment } = loan;
    //Saca el del index menor, sin pagar
    let payment = this.setPayment();
    let inTime = moment().isSameOrBefore(moment(payment.date.toDate()));
    if (!inTime) if (payment["late"] == false) payment["late"] = true;
    //Lo que se ha pagado en total de ese pago
    let payment_amount_paid =
      this.amount_paid + extra_amount + payment["payment_amount_paid"];
    //Lo que se ha pagado de todo el prestamo
    this.loan$["total_amount_paid"] += this.amount_paid;

    //Lo pagado ahora
    switch (true) {
      case payment_amount_paid < fee_payment:
        payment["paid"] = false;
        payment["payment_amount_paid"] = payment_amount_paid;
        this.loan$["extra_amount"] = 0;
        break;

      case payment_amount_paid > fee_payment:
        let extra = payment_amount_paid;
        let payment_over;

        if (
          this.loan$["total_amount_paid"] > total_payment ||
          this.loan$["total_amount_paid"] == total_payment
        ) {
          this.loan$["extra_amount"] =
            this.loan$["total_amount_paid"] - total_payment;
          this.loan$["payment_dates"].forEach((payment) => {
            payment["payment_amount_paid"] = fee_payment;
            payment["paid"] = true;
          });
          this.loan$["state"] = "completed";
          break;
        }
        while (extra >= fee_payment) {
          payment_over = this.setPayment();
          payment_over["payment_amount_paid"] = fee_payment;
          payment_over["paid"] = true;
          extra -= fee_payment;
        }
        payment_over = this.setPayment();
        payment_over["payment_amount_paid"] = extra;
        break;

      case payment_amount_paid == fee_payment:
        payment["paid"] = true;
        payment["payment_amount_paid"] = fee_payment;
        this.loan$["extra_amount"] = 0;
        break;

      default:
        break;
    }

    this.loan$["missing_amount"] -= this.amount_paid;
    if (this.loan$["missing_amount"] < 0) this.loan$["missing_amount"] = 0;

    let payment_made = {
      user_id: this.loan$["user_id"],
      loan_id: this.loan_id,
      index: payment["index"],
      late: payment["late"],
      paid: payment["paid"],
      date: payment["date"],
      client_name: this.loan$["client_name"],
      client_email: this.loan$["client_email"],
      created_at: new Date(),
      amount_paid: this.amount_paid,
      missing_amount: this.loan$["missing_amount"],
      total_amount_paid: this.loan$["total_amount_paid"],
      expected_amount: this.loan$["fee_payment"],
    };

    // console.table(this.loan$);
    // console.table(this.loan$["payment_dates"]);
    this.checkIfCompleted(this.loan$);
    this.payment.pay(payment_made, this.loan$, this.loan_id);
    this.modalRef.hide();
  }

  checkIfCompleted(loan) {
    if (
      loan["total_amount_paid"] > loan["total_payment"] ||
      loan["total_amount_paid"] == loan["total_payment"] ||
      loan["state"] == "canceled" ||
      loan["state"] == "completed"
    ) {
      this.loan$["state"] = "completed";
      this.loan_completed = true;
    } else {
      this.loan_completed = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  setPayment() {
    let payment_over = this.loan$["payment_dates"]
      .filter((element) => element.paid == false)
      .reduce((prev, curr) => (prev.index < curr.index ? prev : curr));
    return payment_over;
  }

  getPayments(index, loan_id) {
    let payments = this.payment.returnPayment(index, loan_id);
    return payments;
  }

  returnPayments(index, loan_id) {
    this.payments_made = this.payment.returnPayment(index, loan_id);
  }
}
