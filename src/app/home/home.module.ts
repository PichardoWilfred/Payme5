import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { HomeRoutingModule } from "./home-routing.module";
import { AboutComponent } from "./about/about.component";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";

//Layout
import { LayoutModule } from "../layout/layout.module";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { SettingsFormComponent } from "./settings/settings-form/settings-form.component";
import { NumeralModule } from "ngx-numeral";
//Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { AuthModule } from "../auth/auth.module";
//import { VerifyEmailComponent } from './verify-email/verify-email.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    HomeLayoutComponent,
    ProfileComponent,
    SettingsComponent,
    SettingsFormComponent,
    //VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    NumeralModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
})
export class HomeModule {}
