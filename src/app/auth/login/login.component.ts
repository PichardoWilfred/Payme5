import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  imgSrc2 = require('../../../assets/imagenes/payme_letra_negro.png');
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}
  hidepassword = true;
  ngOnInit() {}
  loginForm: FormGroup = this.fb.group({
    email: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
  });
  async login() {
    await this.auth.login(this.loginForm.value);
  }
}
