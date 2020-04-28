import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoanRoutingModule } from "./loan-routing.module";
import { NewLoanComponent } from "./new-loan/new-loan.component";
import { LoanListComponent } from "./loan-list/loan-list.component";
import { LoanDetailComponent } from "./loan-detail/loan-detail.component";
import { LoanPaymentComponent } from "./loan-payment/loan-payment.component";
import { LoanLayoutComponent } from "./loan-layout/loan-layout.component";
import { LayoutModule } from "../layout/layout.module";
import { LoanFormComponent } from "./loan-layout/loan-form/loan-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListLComponent } from "./loan-list/list-l/list-l.component"; //Forms

@NgModule({
  declarations: [
    NewLoanComponent,
    LoanListComponent,
    LoanDetailComponent,
    LoanPaymentComponent,
    LoanLayoutComponent,
    LoanFormComponent,
    ListLComponent,
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoanModule {}
