import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PaymentListComponent } from "./payment-list/payment-list.component";
import { PaymentLayoutComponent } from "./payment-layout/payment-layout.component";

const paymentRoutes: Routes = [
  {
    path: "",
    component: PaymentLayoutComponent,
    children: [
      { path: "payment-list", component: PaymentListComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(paymentRoutes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
