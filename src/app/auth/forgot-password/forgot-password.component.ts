import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private layout: LayoutService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.layout.toggleAuth(["verify-email"]);
    this.layout.changeTitle("Recuperar contraseña");
  }
  forgotForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  });
  get email() {
    return this.forgotForm.get("email");
  }
  async submit() {
    try {
      await this.auth.resetPassword(this.forgotForm.value.email);
      this.router.navigate(["auth/login"]);
    } catch (error) {
      console.log("Error->", error);
    }
  }
}
