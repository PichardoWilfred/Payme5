import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LoanService } from "../loan.service";
@Component({
  selector: "app-loan-detail",
  templateUrl: "./loan-detail.component.html",
  styleUrls: ["./loan-detail.component.scss"],
})
export class LoanDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private db: LoanService,
    private router: Router
  ) {}
  loanSubscription: Subscription;
  showSpinner: boolean = true;

  loan$: Object;
  loan_id: string;

  ngOnInit() {
    this.loan_id = this.route.snapshot.paramMap.get("id");
    this.loanSubscription = this.db.getLoan(this.loan_id).subscribe((loan) => {
      this.loan$ = loan;
      this.showSpinner = false;
    });
  }

  ngOnDestroy() {
    this.loanSubscription.unsubscribe();
  }

  cancelLoan() {
    this.db.cancelLoan(this.loan$, this.loan_id);
    this.router.navigate(["loan/loan-list"]);
  }
}
