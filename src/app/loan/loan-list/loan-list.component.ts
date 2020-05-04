import { Component, OnInit } from "@angular/core";
@Component({
  selector: "loanList",
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.scss"],
})
export class LoanListComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  loansLength: number;
  showSpinner: boolean = true;

  setLoans(length: number) {
    this.loansLength = length;
    this.showSpinner = false;
  }
}
