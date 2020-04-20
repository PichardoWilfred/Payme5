import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const AppRoutes: Routes = [
  {
    path: "notes",
    loadChildren: () =>
      import("./notes/notes.module").then((m) => m.NotesModule),
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "loan",
    loadChildren: () => import("./loan/loan.module").then((m) => m.LoanModule),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./payment/payment.module").then((m) => m.PaymentModule),
  },
  {
    path: "client",
    loadChildren: () =>
      import("./client/clients.module").then((m) => m.ClientModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
