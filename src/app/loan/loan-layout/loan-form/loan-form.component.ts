import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { ClientService } from "src/app/client/client.service";
import * as moment from "moment";
import "moment/locale/es";
import { GuarantorService } from "src/app/guarantor/guarantor.service";
import { MatStepper } from "@angular/material";

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
    private db: ClientService,
    private guarantor: GuarantorService
  ) {}

  ngOnInit() {
    this.stateSubscription = this.af.authState.subscribe((auth) => {
      this.client$ = this.db.getClients(auth.uid);
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

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  client$: Observable<Object[]>;
  clientEmailHint: string = "";
  clientNotSelected: boolean = true;
  client_name: string;
  client_id: string = null;

  guarantor$: Observable<Object[]>;
  guarantorEmailHint: string = "";
  guarantor_name: string;
  guarantor_id: string = null;
  guarantor_cellphone: string;

  theresGuarantors: boolean = false;
  newGuarantor: boolean = false;
  selectedGuarantor: boolean = false;

  amount: number = null;
  payment_period: string = null;
  interest_rate: number = null;
  fees_amount: number = null;
  paymentDates: string[] = null;

  full_interest: number;
  fee_payment: number = null;
  total_payment: number = null;

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  getResults() {
    this.full_interest = this.amount * (this.interest_rate * 0.01) || null;
    this.total_payment = this.amount + this.full_interest || null;
    if (this.total_payment && this.fees_amount) {
      this.fee_payment = Math.ceil(this.total_payment / this.fees_amount);
    }
    this.setPaymentDates(this.payment_period, this.fees_amount);

    this.guarantor$ = this.guarantor.getGuarantors(this.client_id);
    this.guarantor$.subscribe((guarantor) => {
      if (guarantor.length) {
        this.theresGuarantors = true;
      } else {
        this.theresGuarantors = false;
      }
    });
  }

  addGuarantor(guarantor) {
    let new_guarantor = {
      ...guarantor,
      client_id: this.client_id,
      client_name: this.client_name,
      client_email: this.clientEmailHint,
    };

    const { name, email, cellphone, guarantor_id } = guarantor;
    this.guarantor.addGuarantor(new_guarantor);
    this.guarantor_name = name;
    this.guarantorEmailHint = email;
    this.guarantor_cellphone = cellphone;
    this.guarantor_id = guarantor_id;
    this.stepper.next();
  }

  setGuarantorHint(guarantor) {
    const { email, name } = guarantor;
    this.guarantorEmailHint = email;
    this.guarantor_name = name;
  }
  setClientHint(client) {
    const { email, name } = client;
    if (!client["active_loan"]) {
      this.clientEmailHint = email;
      this.client_name = name;
      this.clientNotSelected = false;
      this.guarantorEmailHint = "";
      this.guarantor_id = "";
    }
  }

  newGuarantorbtn() {
    this.newGuarantor = true;
    this.move(2);
  }
  guarantorSelectedBtn() {
    this.newGuarantor = false;
    this.move(2);
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

  submit() {
    let loanFormValue = {
      ...this.loanForm.value,
      client_id: this.client_id,
      client_email: this.clientEmailHint,
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
      firstCheck: true,
      cancel_reason: "",
      guarantor_id: this.guarantor_id,
      guarantor_name: this.guarantor_name,
      guarantor_email: this.guarantorEmailHint,
    };
    this.formValue.emit(loanFormValue);
  }
}
