import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewLoanComponent } from "./new-loan/new-loan.component";
import { LoanListComponent } from "./loan-list/loan-list.component";
import { LoanDetailComponent } from "./loan-detail/loan-detail.component";
import { LoanLayoutComponent } from "./loan-layout/loan-layout.component";

const loanRoutes: Routes = [
  {
    path: "",
    component: LoanLayoutComponent,
    children: [
      { path: "new-loan", component: NewLoanComponent },
      { path: "loan-list", component: LoanListComponent },
      { path: ":id", component: LoanDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(loanRoutes)],
  exports: [RouterModule],
})
export class LoanRoutingModule {}
