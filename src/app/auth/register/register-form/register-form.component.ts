import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { LayoutService } from "src/app/layout/layout.service";
import { Observable } from "rxjs";
@Component({
  selector: "register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  @Input() initialFormValue: Observable<Object>;
  @Input() showPass: boolean;
  @Output() formValue = new EventEmitter<Object>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private layout: LayoutService
  ) {}

  ngOnInit() {
    this.registerForm.patchValue(this.initialFormValue);
  }

  ngOnDestroy() {
    this.layout.changeTitle("");
  }

  hidepassword = true;
  registerForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(12), Validators.maxLength(70)],
    ],
    email: ["", [Validators.required, Validators.email]],
    username: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    ],
    cellphone: [null, [Validators.required, Validators.minLength(10)]],
    phone: [null, [Validators.minLength(10)]],
  });

  submit() {
    this.formValue.emit(this.registerForm.value);
  }

  //Getters
  get name() {
    return this.registerForm.get("name");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get username() {
    return this.registerForm.get("username");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get cellphone() {
    return this.registerForm.get("cellphone");
  }
  //Fin de los getters
  goLogin() {
    this.router.navigate(["/auth/login"]);
  }
}
