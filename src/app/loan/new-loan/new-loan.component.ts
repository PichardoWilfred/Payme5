import { Component, OnInit } from "@angular/core";
import { LoanService } from "../loan.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-new-loan",
  templateUrl: "./new-loan.component.html",
  styleUrls: ["./new-loan.component.scss"],
})
export class NewLoanComponent implements OnInit {
  constructor(
    private database: LoanService,
    private route: Router,
    private fireAuth: AngularFireAuth
  ) {}
  default: Object = {};
  uid: string;

  ngOnInit() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  addLoan(loanForm: Object) {
    loanForm["user_id"] = this.uid;
    this.database.addLoan(loanForm);
    this.route.navigate(["loan/loan-list"]);
  }
}
