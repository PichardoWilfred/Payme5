import { Component, OnInit } from "@angular/core";
@Component({
  selector: "loanList",
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.scss"],
})
export class LoanListComponent implements OnInit {
  loansLength: number;
  showSpinner: boolean = true;
  constructor() {}
  ngOnInit() {}

  setLoans(length: number) {
    this.loansLength = length;
    this.showSpinner = false;
  }
}
