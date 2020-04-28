import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoanService } from "../loan.service";
@Component({
  selector: "loanList",
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.scss"],
})
export class LoanListComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  loansLength: string;
  showSpinner: boolean = true;

  setLoans(length: number) {
    this.loansLength = length.toString();
    this.showSpinner = false;
  }
}
