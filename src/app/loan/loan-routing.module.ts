import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewLoanComponent } from "./new-loan/new-loan.component";
import { LoanListComponent } from "./loan-list/loan-list.component";
import { LoanDetailComponent } from "./loan-detail/loan-detail.component";
import { LoanLayoutComponent } from "./loan-layout/loan-layout.component";
import { LoanPaymentComponent } from "./loan-payment/loan-payment.component";
import { GuarantorDetailComponent } from "../guarantor/guarantor-detail/guarantor-detail.component";
import { AuthGuardGuard } from "../auth/auth-guard.guard"; //guard

const loanRoutes: Routes = [
  {
    path: "",
    component: LoanLayoutComponent,
    children: [
      { path: "new-loan", component: NewLoanComponent },
      { path: "loan-list", component: LoanListComponent },
      { path: ":id", component: LoanDetailComponent },
      { path: ":id/payments", component: LoanPaymentComponent },
      { path: ":id/guarantor", component: GuarantorDetailComponent },

      { path: "", redirectTo: "/loan/loan-list" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(loanRoutes)],
  exports: [RouterModule],
})
export class LoanRoutingModule {}
