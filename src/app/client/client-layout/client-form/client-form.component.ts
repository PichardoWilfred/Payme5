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
  @Input() marginB: boolean;
  @Output() formValue = new EventEmitter<Object>();
  showJInput: boolean;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.clientForm.patchValue(this.initialFormValue);
    this.showJInput =
      this.clientForm.controls["work_status"].value == "Empleado"
        ? true
        : false;
  }
  clientForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    ],
    email: ["", [Validators.required, Validators.email]],
    ssn: ["", [Validators.required, Validators.minLength(10)]],
    address: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    ],
    cellphone: [null, [Validators.required, Validators.minLength(10)]],
    phone: [null, [Validators.minLength(10)]],
    civil_status: ["", [Validators.required]],
    work_status: ["", [Validators.required]],
    //Bussiness information
    bussiness_name: ["", [Validators.minLength(3), Validators.maxLength(70)]],
    job_title: ["", [Validators.minLength(8), Validators.maxLength(70)]],
    bussiness_phone: [null, [Validators.minLength(10)]],
    salary: [{ value: null, disabled: false }, [Validators.minLength(3)]],
    business_address: [
      "",
      [Validators.minLength(10), Validators.maxLength(70)],
    ],
    //relative data
    relative_name: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    ],
    relative_email: ["", [Validators.required, Validators.email]],
    relative_cellphone: [null, [Validators.required, Validators.minLength(10)]],
    relative_bond: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(70)],
    ],
  });

  submit() {
    if (!this.showJInput) {
      this.clientForm.controls["bussiness_name"].reset();
      this.clientForm.controls["job_title"].reset();
      this.clientForm.controls["bussiness_phone"].reset();
      this.clientForm.controls["salary"].reset();
      this.clientForm.controls["business_address"].reset();
    }
    this.formValue.emit(this.clientForm.value);
    //console.log(this.clientForm.value);
  }
  toggleshowJobInputs(show: boolean) {
    this.showJInput = show;
  }
}
