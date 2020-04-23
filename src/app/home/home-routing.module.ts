import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { AboutComponent } from "./about/about.component";
import { HomeLayoutComponent } from './home-layout/home-layout.component';

import { AuthGuardGuard } from "../auth/auth-guard.guard"; //guard

const homeRoutes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "about", component: AboutComponent },
    ],
    canActivate: [AuthGuardGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
