import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"],
})
export class ClientFormComponent implements OnInit {
  @Input() initialFormValue: Observable<Object>;
  @Output() formValue = new EventEmitter<Object>();
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.clientForm.patchValue(this.initialFormValue);
  }
  clientForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    ],
    // email: ["", [Validators.required, Validators.email]],
    // ssn: ["", [Validators.required, Validators.minLength(13)]],
    // address: [
    //   "",
    //   [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    // ],
    // cellphone: [null, [Validators.required, Validators.minLength(10)]],
    // phone: [null, [Validators.minLength(10)]],
    // civil_status: ["", [Validators.required]],
    // work_status: ["", [Validators.required]],
    // salary: [null, [Validators.minLength(3)]],
    // relative_name: [
    //   "",
    //   [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    // ],
    // relative_email: ["", [Validators.required, Validators.email]],
    // relative_cellphone: [null, [Validators.required, Validators.minLength(10)]],
    // relative_bond: ["", [Validators.required]],
    // guarantor_name: [
    //   "",
    //   [
    //     Validators.required,
    //     Validators.minLength(10),
    //     Validators.maxLength(100),
    //   ],
    // ],
    // guarantor_email: ["", [Validators.required, Validators.email]],
    // guarantor_cellphone: ["", [Validators.required, Validators.minLength(10)]],
  });
  submit() {
    this.formValue.emit(this.clientForm.value);
  }
}
