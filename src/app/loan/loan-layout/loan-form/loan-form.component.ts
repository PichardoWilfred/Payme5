import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { ClientService } from "src/app/client/client.service";
import * as moment from "moment";
import "moment/locale/es";
@Component({
  selector: "loan-form",
  templateUrl: "./loan-form.component.html",
  styleUrls: ["./loan-form.component.scss"],
})
export class LoanFormComponent implements OnInit {
  @Input() initialFormValue: Observable<Object>;
  @Output() formValue = new EventEmitter<Object>();
  constructor(
    private fb: FormBuilder,
    private af: AngularFireAuth,
    private db: ClientService
  ) {}

  ngOnInit() {
    this.stateSubscription = this.af.authState.subscribe((auth) => {
      this.client$ = this.db.getAvailableClients(auth.uid);
      this.user_id = auth.uid;
    });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  stateSubscription: Subscription;
  user_id: string;
  loanForm: FormGroup = this.fb.group({
    client_id: ["", Validators.required],
    amount: ["", Validators.required],
    payment_period: ["", Validators.required],
    interest_rate: ["", Validators.required],
    fees_amount: ["", Validators.required],
  });

  client$: Observable<Object[]>;
  emailHint: string = "cliente@gmail.com";
  client_name: string;
  client_id: string = null;

  amount: number = null;
  payment_period: string = null;
  interest_rate: number = null;
  fees_amount: number = null;
  paymentDates: string[] = null;

  full_interest: number;
  fee_payment: number = null;
  total_payment: number = null;

  getResults() {
    this.full_interest = this.amount * (this.interest_rate * 0.01) || null;
    this.total_payment = this.amount + this.full_interest || null;
    if (this.total_payment && this.fees_amount) {
      this.fee_payment = Math.ceil(this.total_payment / this.fees_amount);
    }
    this.setPaymentDates(this.payment_period, this.fees_amount);
  }

  submit() {
    let loanFormValue = {
      ...this.loanForm.value,
      client_id: this.client_id,
      client_email: this.emailHint,
      client_name: this.client_name,
      full_interest: this.full_interest,
      total_payment: this.total_payment,
      fee_payment: this.fee_payment,
      active: true,
      state: "pending",
      created_at: new Date(),
      payment_dates: this.paymentDates,
      missing_amount: this.total_payment,
      total_amount_paid: 0,
      extra_amount: 0,
    };
    this.formValue.emit(loanFormValue);
  }

  setHint({ email, name }) {
    this.emailHint = email;
    this.client_name = name;
  }

  setPaymentDates(payment_period: string, cuotes: number) {
    switch (payment_period) {
      case "mensual": {
        this.paymentDates = this.createDates(cuotes, "months");
        break;
      }
      case "semanal": {
        this.paymentDates = this.createDates(cuotes, "weeks");
        break;
      }
      case "anual": {
        this.paymentDates = this.createDates(cuotes, "years");
        break;
      }
      default:
        console.log("ERROR IN PAYMENT CREATION");
        break;
    }
  }
  createDates(cuotes: number, time_period: string) {
    let format: string = "MM/DD/YYYY";
    let today: any = moment();
    let dates = [];
    for (let i = 0; i < cuotes; i++) {
      let payment = {
        index: i,
        date: new Date(today.add(1, time_period).format(format)),
        paid: false,
        payment_amount_paid: 0,
        late: false,
      };
      dates.push(payment);
    }
    return dates;
  }
}
