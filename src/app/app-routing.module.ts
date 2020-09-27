import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./auth/auth-guard.guard";
import { AuthLoggedGuard } from "./auth/auth-logged.guard";
import { VerifyEmailGuard } from "./auth/verify-email.guard";
const AppRoutes: Routes = [
  {
    path: "notes",
    loadChildren: () =>
      import("./notes/notes.module").then((m) => m.NotesModule),
  },
  {
    path: "home",
    canActivate: [AuthGuardGuard, VerifyEmailGuard],
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "loan",
    canActivate: [AuthGuardGuard, VerifyEmailGuard],
    loadChildren: () => import("./loan/loan.module").then((m) => m.LoanModule),
  },
  {
    path: "payment",
    canActivate: [AuthGuardGuard, VerifyEmailGuard],
    loadChildren: () =>
      import("./payment/payment.module").then((m) => m.PaymentModule),
  },
  {
    path: "client",
    canActivate: [AuthGuardGuard, VerifyEmailGuard],
    loadChildren: () =>
      import("./client/clients.module").then((m) => m.ClientModule),
  },
  {
    path: "auth",
    canActivate: [AuthLoggedGuard, VerifyEmailGuard],
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "", redirectTo: "/auth/welcome", pathMatch: "full" },
  { path: "**", redirectTo: "/client" },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
