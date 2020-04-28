import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "loan-form",
  templateUrl: "./loan-form.component.html",
  styleUrls: ["./loan-form.component.scss"],
})
export class LoanFormComponent implements OnInit {
  @Input() initialFormValue: Observable<Object>;
  @Output() formValue = new EventEmitter<Object>();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loanForm.valueChanges.subscribe((loan) => {
      this.full_interest = loan.mount * loan.interest_rate;
    });
  }

  loanForm: FormGroup = this.fb.group({
    mount: ["", Validators.required],
    payment_period: ["", Validators.required],
    interest_rate: ["", Validators.required],
    fees_amount: ["", Validators.required],
  });

  mount: number = 0;
  payment_period: number = 0;
  interest_rate: number = 0;
  fees_amount: number = 0;

  full_interest: number = 0;
  total_payment: number = 0;

  submit() {
    this.formValue.emit(this.loanForm.value);
  }
}
