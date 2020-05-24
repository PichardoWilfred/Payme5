import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LayoutService } from "src/app/layout/layout.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private layout: LayoutService,
    private auth: AngularFireAuth,
    private route: Router
  ) {}
  hidepassword = true;
  ngOnInit() {
    this.layout.changeTitle("Iniciar Sesión");
  }
  ngOnDestroy() {
    this.layout.changeTitle("");
  }

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
    await this.authS.login(this.loginForm.value);
  }
}
