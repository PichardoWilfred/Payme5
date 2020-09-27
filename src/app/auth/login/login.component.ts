import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LayoutService } from "src/app/layout/layout.service";
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
    private router: Router
  ) {}
  ngOnInit() {
    this.layout.changeTitle("Iniciar Sesión");
    this.layout.toggleAuth(["unlogged"]);
  }
  ngOnDestroy() {
    this.layout.changeTitle("");
  }
  hidepassword = true;
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
    try {
      const usr = await this.authS.login(this.loginForm.value);
      if (usr) {
        const isVerified = this.authS.isEmailVerified(usr);
        this.redirectUser(isVerified);
        //console.log(usr);
      }
    } catch (e) {}
  }
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(["client/client-list"]);
    } else {
      this.router.navigate(["home/verify-email"]);
    }
  }
}
