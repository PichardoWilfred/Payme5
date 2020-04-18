import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"],
})
export class ClientFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  clientForm: FormGroup;
  ngOnInit() {
    this.clientForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(70),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      address: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(70),
        ],
      ],
      cellphone: [null, [Validators.required, Validators.minLength(10)]],
      phone: [null, [Validators.minLength(10)]],
      ssn: ["", [Validators.required, Validators.minLength(13)]],
      civil_status: ["", [Validators.required]],
      work_status: ["", [Validators.required]],
      salary: [null, [Validators.required, Validators.minLength(3)]],
      relative_name: [
        "",
        [Validators.required, Validators.min(10), Validators.max(100)],
      ],
      relative_email: [null, [Validators.required, Validators.email]],
      relative_cellphone: [
        null,
        [Validators.required, Validators.minLength(10)],
      ],
      relative_bond: ["", [Validators.required]],
      guarantor_name: [
        "",
        [Validators.required, Validators.min(10), Validators.max(100)],
      ],
      guarantor_email: ["", [Validators.required, Validators.email]],
      guarantor_cellphone: [
        null,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }
}
