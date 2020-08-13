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
  @ViewChild("stepper", { static: false }) stepper: MatStepper;

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
    term: ["", Validators.required],
    interest_rate: ["", Validators.required],
    fees_amount: ["", Validators.required],
  });

  //Client related
  client$: Observable<Object[]>;
  clientEmailHint: string = "";
  clientNotSelected: boolean = true;
  client_name: string;
  client_id: string = null;

  //Guarantor form related
  guarantor$: Observable<Object[]>;
  guarantorEmailHint: string = "";
  guarantor_name: string;
  guarantor_id: string = null;
  guarantor_cellphone: string;

  theresGuarantors: boolean = false;
  newGuarantor: boolean = false;
  neededGuarantor: boolean = false;
  guarantorModule_completed: boolean = false;
  gnmamount: number = 1000; //guarantor needed minimum amount

  //Loan related
  amount: number = null;
  term: string = null;
  interest_rate: number = null;
  fees_amount: number = null;
  paymentDates: string[] = null;

  full_interest: number;
  fee_payment: number = null;
  total_amount: number = null;
  monthly_interest: number = null;

  move(index: number) {
    //for Jumping stepper steps
    this.stepper.selectedIndex = index;
  }

  getResults() {
    this.monthly_interest = this.amount * (this.interest_rate * 0.01) || null;
    this.full_interest = this.monthly_interest * this.fees_amount;
    this.total_amount = this.amount + this.full_interest || null;

    if (this.total_amount && this.fees_amount) {
      this.fee_payment = Math.ceil(this.total_amount / this.fees_amount);
    }
    this.paymentDates = this.setPaymentDates(this.term, this.fees_amount);

    this.guarantor$ = this.guarantor.getGuarantors(this.client_id);
    this.guarantor$.subscribe((guarantor) => {
      this.theresGuarantors = guarantor.length ? true : false;
    });
    //Que determine si el monto mínimo está disponible
    this.neededGuarantor = this.amount > this.gnmamount ? true : false;
    if (this.guarantor_id)
      console.log("hay un guanrantor id y es:", this.guarantor_id);

    if (this.guarantor_id) {
      if (this.guarantor_id == "No seleccionado" && this.neededGuarantor) {
        this.guarantorModule_completed = false;
      } else {
        this.guarantorModule_completed = true;
      }
    } else {
      this.guarantorModule_completed = false;
    }

    console.log(
      "ModuloDeGarantes.completed es: ",
      this.guarantorModule_completed
    );

    //Desactívalo si se necesita un garante y no hay ninguno seleccionado
    //Se usará la variable de guarantorModule_completed
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
  setNoGuarantor() {
    //Here we will see a default value for the minimum amount for not having a guarantor
    //Cause small loans do not need a guarantor
    console.log("No seleccionaste ningún garante");
    this.guarantor_id = "No seleccionado";
    this.guarantor_name = "No seleccionado";
    this.guarantorEmailHint = "No seleccionado";
    this.move(2);
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

  private nextFromGuarantor(value: boolean): void {
    this.newGuarantor = value;
    this.move(2);
  }

  setPaymentDates(payment_period: string, cuotes: number) {
    switch (payment_period) {
      case "mensual": {
        return this.createDates(cuotes, "months", 1);
        break;
      }
      case "semanal": {
        return this.createDates(cuotes, "weeks", 1);
        break;
      }
      case "quincenal": {
        return this.createDates(cuotes, "weeks", 2);
        break;
      }
      default:
        console.log("ERROR IN PAYMENT CREATION");
        break;
    }
  }
  createDates(cuotes: number, time_period: string, jump_lap: number) {
    let format: string = "MM/DD/YYYY";
    let today: any = moment();
    let dates = [];

    for (let i = 0; i < cuotes; i++) {
      let payment = {
        index: i,
        date: new Date(today.add(jump_lap, time_period).format(format)),
        paid: false,
        payment_deposit: 0,
        late: false,
      };
      dates.push(payment);
    } //forloop
    return dates;
  }

  submit() {
    let loanFormValue = {
      ...this.loanForm.value,
      client_id: this.client_id,
      client_email: this.clientEmailHint,
      client_name: this.client_name,
      full_interest: this.full_interest,
      total_amount: this.total_amount,
      fee_payment: this.fee_payment,
      active: true,
      state: "pending",
      created_at: new Date(),
      payment_dates: this.paymentDates,
      missing_amount: this.total_amount,
      amount_paid: 0,
      extra_amount: 0,
      firstCheck: true,
      cancel_reason: "", //Parameters below are related to the guarantor only
      guarantor_id: this.guarantor_id,
      guarantor_name: this.guarantor_name,
      guarantor_email: this.guarantorEmailHint,
    };
    this.formValue.emit(loanFormValue);
  }
}
