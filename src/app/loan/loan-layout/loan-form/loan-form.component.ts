import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AngularFireAuth } from "@angular/fire/auth";
import { ClientService } from "src/app/client/client.service";

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
    private modal: BsModalService,
    private af: AngularFireAuth,
    private db: ClientService
  ) {}
  modalRef: BsModalRef;
  ngOnInit() {
    this.stateSubscription = this.af.authState.subscribe((auth) => {
      this.client$ = this.db.getAvailableClients(auth.uid);
    });
  }

  loanForm: FormGroup = this.fb.group({
    client_id: ["", Validators.required],
    mount: ["", Validators.required],
    payment_period: ["", Validators.required],
    interest_rate: ["", Validators.required],
    fees_amount: ["", Validators.required],
  });

  client$: Observable<Object[]>;
  emailHint: string = "cliente@gmail.com";
  client_name: string;

  mount: number = null;
  payment_period: number = null;
  interest_rate: number = null;
  fees_amount: number = null;
  client_id: string = null;

  full_interest: number;
  fee_payment: number = null;
  total_payment: number = null;

  openModal(template: TemplateRef<any>) {
    this.full_interest = this.mount * (this.interest_rate * 0.01) || null;
    this.total_payment = this.mount + this.full_interest || null;
    if (this.total_payment && this.fees_amount) {
      this.fee_payment = this.total_payment / this.fees_amount;
    }
    this.modalRef = this.modal.show(template);
  }

  submit() {
    let loanFormValue = this.loanForm.value;
    loanFormValue["client_id"] = this.client_id;
    loanFormValue["client_email"] = this.emailHint;
    loanFormValue["client_name"] = this.client_name;

    loanFormValue["full_interest"] = this.full_interest;
    loanFormValue["total_payment"] = this.total_payment;
    loanFormValue["fee_payment"] = this.fee_payment;
    loanFormValue["active"] = true;

    this.formValue.emit(loanFormValue);
    this.modalRef.hide();
    // console.log("============================");
    // console.log("La id seleccionada fue: " + this.client_id);
    // console.log("La tasa de interes: " + this.interest_rate);
    // console.log("Los pagos por cuota: " + this.fee_payment);
    // console.log("El Monto: " + this.mount);
    // console.log("El interés total es: " + this.full_interest);
  }

  setHint(client: Object) {
    this.emailHint = client["email"];
    this.client_name = client["name"];
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  stateSubscription: Subscription;
}
