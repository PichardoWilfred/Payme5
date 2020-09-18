import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Location } from "@angular/common";
@Component({
  selector: "guarantor-form",
  templateUrl: "./guarantor-form.component.html",
  styleUrls: ["./guarantor-form.component.scss"],
})
export class GuarantorFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private location: Location
  ) {}
  @Input() initialFormValue = new EventEmitter<Object>();
  @Output() newGuarantor = new EventEmitter<Object>();
  @Input() inNewLoan = new EventEmitter<boolean>();
  ngOnInit() {
    this.guarantorForm.patchValue(this.initialFormValue);
  }
  guarantorForm: FormGroup = this.fb.group({
    name: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ],
    ],
    email: ["", [Validators.required, Validators.email]],
    ssn: ["", [Validators.required, Validators.minLength(10)]],
    address: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(70)],
    ],
    cellphone: ["", [Validators.required, Validators.minLength(10)]],
    phone: [null, [Validators.minLength(10)]],
    civil_status: ["", [Validators.required]],
    work_status: ["", [Validators.required]],
    salary: [{ value: null, disabled: false }, [Validators.minLength(3)]],
  });

  submit() {
    let guarantor_id = this.firestore.createId();
    this.newGuarantor.emit({
      ...this.guarantorForm.value,
      guarantor_id: guarantor_id,
    });
    this.guarantorForm.reset();
  }

  goBack() {
    this.submit();
    this.location.back();
  }
}
