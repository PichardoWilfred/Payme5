import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
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

  loan$: Observable<Object>;
  loan_id: string;

  ngOnInit() {
    this.loan_id = this.route.snapshot.paramMap.get("id");
    this.loan$ = this.db.getLoan(this.loan_id);
    this.loan$.subscribe(() => {
      this.showSpinner = false;
    });
  }

  ngOnDestroy() {}

  cancelLoan() {
    this.db.cancelLoan(this.loan$, this.loan_id);
    this.router.navigate(["loan/loan-list"]);
  }
}
