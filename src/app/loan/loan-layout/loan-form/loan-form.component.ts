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
import { AuthService } from "src/app/auth/auth.service";
import { HomeService } from "src/app/home/home.service";
import { NumeralPipe } from "ngx-numeral";
//This is the testing change to commit
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
    private guarantor: GuarantorService,
    private home: HomeService //private numeral: NumeralPipe
  ) {}
  ngOnInit() {
    this.stateSubscription = this.af.authState.subscribe((auth) => {
      this.client$ = this.db.getClients(auth.uid);
      this.user_id = auth.uid;
    });

    this.af.authState.subscribe((auth) => {
      this.user$ = this.home.getUser(auth.uid);

      this.user$.subscribe((user) => {
        let numeral = new NumeralPipe(
          user["settings"]["guarantor_minimal_amount"]
        );
        this.gnmamount = numeral.value();
      });
    });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  stateSubscription: Subscription;
  user_id: string;
  user$: Observable<Object>;
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

  //Guarantor data
  guarantor$: Observable<Object[]>;
  guarantorEmailHint: string = "";
  guarantor_name: string;
  guarantor_id: string = null;
  guarantor_cellphone: string;

  //Guarantor form related
  theresGuarantors: boolean = false;
  newGuarantor: boolean = false;
  neededGuarantor: boolean = false;
  guarantorModule_completed: boolean = false;
  gnmamount: number; //guarantor needed minimum amount

  //Loan related
  amount: number = null;
  sAmount: string = null; //for later conversion
  term: string = null;
  interest_rate: number = null;
  fees_amount: number = null;
  paymentDates: string[] = null;

  full_interest: number;
  fee_payment: number = null;
  total_amount: number = null;
  monthly_interest: number = null;

  //File Upload related
  files: FileList;

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  getResults() {
    let numeral = new NumeralPipe(this.sAmount);
    this.amount = numeral.value();

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

    this.neededGuarantor = this.amount >= this.gnmamount ? true : false;

    if (this.guarantor_id) {
      this.guarantorModule_completed =
        this.guarantor_id == "No seleccionado" && this.neededGuarantor
          ? false
          : true;
    } else {
      this.guarantorModule_completed = false;
    }
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
    let today: any = moment({ hours: 23, minute: 59, seconds: 59 });
    let dates = [];

    for (let i = 0; i < cuotes; i++) {
      let payment = {
        index: i,
        date: new Date(today.add(jump_lap, time_period)),
        paid: false,
        payment_deposit: 0,
        late: false,
      };
      dates.push(payment);
    }
    return dates;
  }

  setFiles(files: FileList) {
    this.files = files;
  }
  submit() {
    let loanFormValue = {
      ...this.loanForm.value,
      client_id: this.client_id,
      client_email: this.clientEmailHint,
      client_name: this.client_name,
      monthly_interest: this.monthly_interest,
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
      cancel_reason: "", //Parameters below are only related to the guarantor
      guarantor_id: this.guarantor_id,
      guarantor_name: this.guarantor_name,
      guarantor_email: this.guarantorEmailHint,
      files: this.files,
    };
    //console.log(loanFormValue); // debugging purposes
    this.formValue.emit(loanFormValue);
  }
}
