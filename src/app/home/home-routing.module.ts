import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { AboutComponent } from "./about/about.component";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";

import { AuthGuardGuard } from "../auth/auth-guard.guard"; //guard
import { SettingsComponent } from "./settings/settings.component";

import { ProfileComponent } from "./profile/profile.component";
const homeRoutes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "settings", component: SettingsComponent },
      { path: "about", component: AboutComponent },
      { path: "", redirectTo: "/home/about" },
      { path: "**", redirectTo: "/home" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
