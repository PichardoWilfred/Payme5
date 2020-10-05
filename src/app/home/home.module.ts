import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { HomeRoutingModule } from "./home-routing.module";
import { AboutComponent } from "./about/about.component";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";
import { AuthModule } from "../auth/auth.module";
//Layout
import { LayoutModule } from "../layout/layout.module";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { SettingsFormComponent } from "./settings/settings-form/settings-form.component";
import { NumeralModule } from "ngx-numeral";
//Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    HomeLayoutComponent,
    ProfileComponent,
    SettingsComponent,
    SettingsFormComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    HomeRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NumeralModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
})
export class HomeModule {}
