import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { LayoutModule } from "../layout/layout.module";

import { NgxMaskModule } from "ngx-mask";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from "./welcome/welcome.component";
import { RegisterFormComponent } from "./register/register-form/register-form.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    WelcomeComponent,
    RegisterFormComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [RegisterFormComponent],
})
export class AuthModule {}
