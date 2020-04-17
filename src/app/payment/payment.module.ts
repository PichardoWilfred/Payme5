import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentRoutingModule } from "./payment-routing.module";

import { PaymentListComponent } from "./payment-list/payment-list.component";
import { PaymentDetailComponent } from "./payment-detail/payment-detail.component";
import { PaymentLayoutComponent } from "./payment-layout/payment-layout.component";
//LayoutModule
import { LayoutModule } from "../layout/layout.module";

@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentDetailComponent,
    PaymentLayoutComponent,
  ],
  imports: [CommonModule, PaymentRoutingModule, LayoutModule],
})
export class PaymentModule {}
