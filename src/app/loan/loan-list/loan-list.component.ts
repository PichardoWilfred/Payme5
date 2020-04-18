import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoanService } from "../loan.service";
@Component({
  selector: "app-loan-list",
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.scss"],
})
export class LoanListComponent implements OnInit {
  constructor(private loans: LoanService) {}
  loan$: Observable<any[]>;
  showSpinner: Boolean = true;
  ngOnInit() {
    this.loan$ = this.loans.getLoans();
    this.loan$.subscribe(() => (this.showSpinner = false));
  }
}
