import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "loan-form",
  templateUrl: "./loan-form.component.html",
  styleUrls: ["./loan-form.component.scss"],
})
export class LoanFormComponent implements OnInit {
  @Input() initialFormValue: Observable<Object>;
  @Output() formValue = new EventEmitter<Object>();
  constructor(private fb: FormBuilder, private modal: BsModalService) {}
  modalRef: BsModalRef;
  ngOnInit() {}

  loanForm: FormGroup = this.fb.group({
    mount: ["", Validators.required],
    payment_period: ["", Validators.required],
    interest_rate: ["", Validators.required],
    fees_amount: ["", Validators.required],
  });

  mount: number = null;
  payment_period: number = null;
  interest_rate: number = null;
  fees_amount: number = null;

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
    // let loanFormValue = this.loanForm.value;
    // loanFormValue["full_interest"] = this.full_interest;
    // loanFormValue["total_payment"] = this.total_payment;
    // this.formValue.emit(loanFormValue);
    console.log("============================");
    console.log("La tasa de interes: " + this.interest_rate);
    console.log("Los pagos por cuota: " + this.fee_payment);
    console.log("El Monto: " + this.mount);
    console.log("El interés total es: " + this.full_interest);
  }
}
