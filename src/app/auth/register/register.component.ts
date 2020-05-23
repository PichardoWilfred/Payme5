import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { LayoutService } from "src/app/layout/layout.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hidepassword = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private layout: LayoutService
  ) {}
  ngOnInit() {
    this.layout.changeTitle("Crear usuario");
  }
  ngOnDestroy() {
    this.layout.changeTitle("");
  }
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
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
    cellphone: [null, [Validators.required, Validators.minLength(10)]],
    phone: [null, [Validators.minLength(10)]],
  });

  goLogin() {
    this.router.navigate(["/auth/login"]);
  }

  async register() {
    this.registerForm.value["created_at"] = new Date();
    await this.auth.register(this.registerForm.value);
  }
}
