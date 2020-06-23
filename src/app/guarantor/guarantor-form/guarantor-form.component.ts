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

  @Output() newGuarantor = new EventEmitter<Object>();
  @Input() inNewLoan = new EventEmitter<boolean>();
  ngOnInit() {}
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
    cellphone: ["", [Validators.required, Validators.minLength(10)]],
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
