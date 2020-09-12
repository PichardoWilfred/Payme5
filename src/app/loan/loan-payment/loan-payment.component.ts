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
import { AuthService } from "src/app/auth/auth.service";
import { LayoutService } from "src/app/layout/layout.service";

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
    private modalService: BsModalService,
    private layout: LayoutService,
    private snack: SnackbarService
  ) {}
  paymentForm: FormGroup = this.fb.group({
    amount_paid: [null, [Validators.required]],
  });
  ngOnInit() {
    this.layout.toggleAuth(["detail"]);
    this.loan_id = this.route.snapshot.paramMap.get("id");
    this.Ogloan = this.loan.getLoan(this.loan_id);
    this.Ogloan.subscribe((loan) => {
      this.showSpinner = false;
      this.loan$ = loan;
      this.payments_date = loan["payment_dates"];
      this.checkIfCompleted(loan);
    });
  }

  ngOnDestroy() {
    this.layout.toggleAuth(["logged"]);
  }
  showThesePayments: boolean = false;
  payments_made: Observable<Object[]>;
  showSpinner: boolean = true;
  loan_completed: boolean;

  loan$: Object;
  Ogloan: Observable<Object>;
  loan_id: string;

  payments_date: Object[];
  amount_paid: number; //La cantidad que se acaba de depositar

  pay(loan) {
    let { fee_payment, extra_amount, total_amount } = loan;
    //Saca el del index menor, sin pagar
    let payment = this.setPayment();
    let inTime = moment().isSameOrBefore(moment(payment.date.toDate()));
    if (!inTime) if (payment["late"] == false) payment["late"] = true;
    //Todo lo que se ha depositado en total de ESE pago
    let payment_deposit = //Esto se llamaba 'payment_amount_paid'
      this.amount_paid + extra_amount + payment["payment_deposit"];
    //Lo que se ha pagado de todo el prestamo
    this.loan$["amount_paid"] += this.amount_paid;

    //Pueden suceder 3 cosas cuando pagas:
    switch (true) {
      case payment_deposit < fee_payment:
        payment["paid"] = false;
        payment["payment_deposit"] = payment_deposit;
        this.loan$["extra_amount"] = 0;
        break;

      case payment_deposit > fee_payment:
        let extra = payment_deposit;
        let payment_over;

        if (this.loan$["amount_paid"] >= total_amount) {
          this.loan$["extra_amount"] = this.loan$["amount_paid"] - total_amount;
          this.loan$["payment_dates"].forEach((payment) => {
            payment["payment_deposit"] = fee_payment;
            payment["paid"] = true;
          });
          this.loan$["state"] = "completed";
          break;
        }
        while (extra >= fee_payment) {
          payment_over = this.setPayment();
          payment_over["payment_deposit"] = fee_payment;
          payment_over["paid"] = true;
          extra -= fee_payment;
        }
        payment_over = this.setPayment();
        payment_over["payment_deposit"] = extra;
        break;

      case payment_deposit == fee_payment:
        payment["paid"] = true;
        payment["payment_deposit"] = fee_payment;
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
      full_amount_paid: this.loan$["amount_paid"],
      expected_amount: this.loan$["fee_payment"],
    };

    this.checkIfCompleted(this.loan$);
    this.payment.pay(payment_made, this.loan$, this.loan_id);
    this.modalRef.hide();
    this.snack.bar("El pago fue realizado exitosamente", "OK");
  }

  checkIfCompleted(loan) {
    if (
      loan["amount_paid"] >= loan["total_amount"] ||
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
    let corresponding_payment = this.loan$["payment_dates"]
      .filter((element) => element.paid == false) //Tomamos todos los que no hemos pagado
      .reduce((prev, curr) => (prev.index < curr.index ? prev : curr)); //Tomamos el mas pequeño
    return corresponding_payment;
  }

  //Usado cuando clickeamos los depositos de cada pago.
  returnPayments(index, loan_id) {
    this.payments_made = this.payment.returnPayment(index, loan_id);
  }
}
