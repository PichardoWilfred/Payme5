import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoanRoutingModule } from "./loan-routing.module";
import { NewLoanComponent } from "./new-loan/new-loan.component";
import { LoanListComponent } from "./loan-list/loan-list.component";
import { LoanDetailComponent } from "./loan-detail/loan-detail.component";
import { LoanPaymentComponent } from "./loan-payment/loan-payment.component";
import { LoanLayoutComponent } from "./loan-layout/loan-layout.component";
import { LayoutModule } from "../layout/layout.module";

@NgModule({
  declarations: [
    NewLoanComponent,
    LoanListComponent,
    LoanDetailComponent,
    LoanPaymentComponent,
    LoanLayoutComponent,
  ],
  imports: [CommonModule, LoanRoutingModule, LayoutModule],
})
export class LoanModule {}
