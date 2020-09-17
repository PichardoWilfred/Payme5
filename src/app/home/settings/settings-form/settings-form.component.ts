import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "settings-form",
  templateUrl: "./settings-form.component.html",
  styleUrls: ["./settings-form.component.scss"],
})
export class SettingsFormComponent implements OnInit {
  @Input() initialFormValue: Observable<Object>;
  @Output() formValue = new EventEmitter<Object>();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.settingsForm.patchValue(this.initialFormValue);
  }

  settingsForm: FormGroup = this.fb.group({
    guarantor_minimal_amount: [
      null,
      [Validators.minLength(2), Validators.required],
    ],
  });
  submit() {
    this.formValue.emit(this.settingsForm.value);
  }
}
