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
    HomeRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class HomeModule {}
