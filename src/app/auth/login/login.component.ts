import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}
  hidepassword = true;
  ngOnInit() {}
  loginForm: FormGroup = this.fb.group({
    username: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(70)],
    ],
  });
  goRegister() {
    this.router.navigate(["/auth/register"]);
  }
}
