import { Component, OnInit } from "@angular/core";
import { LoanService } from "../loan.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import * as moment from "moment";
import "moment/locale/es";

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
  ) {
    console.log(this.today);
  }
  default: Object = {};

  format: string = "e DD/MM/YYYY hh:mm:A";
  today: string = moment().format(this.format);

  ngOnInit() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }
  uid: string;

  addLoan(loanForm: Object) {
    loanForm["user_id"] = this.uid;
    this.database.addLoan(loanForm);
    this.route.navigate(["loan/loan-list"]);
  }
}
