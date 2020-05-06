import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PaymentListComponent } from "./payment-list/payment-list.component";
import { PaymentLayoutComponent } from "./payment-layout/payment-layout.component";

import { AuthGuardGuard } from "../auth/auth-guard.guard"; //guard
import { PaymentDetailComponent } from "./payment-detail/payment-detail.component";

const paymentRoutes: Routes = [
  {
    path: "",
    component: PaymentLayoutComponent,
    children: [
      { path: "payment-list", component: PaymentListComponent },
      { path: ":id", component: PaymentDetailComponent },
      { path: "", redirectTo: "/payment/payment-list" },
    ],
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(paymentRoutes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
