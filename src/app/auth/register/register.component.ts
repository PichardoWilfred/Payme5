import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {}
  registerForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
    email: ["", [Validators.required, Validators.email]],
    username: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
    cellphone: [null, [Validators.required, Validators.minLength(10)]],
    phone: [null, [Validators.minLength(10)]],
  });

  goLogin() {
    this.router.navigate(["/auth/login"]);
  }
}
