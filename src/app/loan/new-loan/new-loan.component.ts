import { Component, OnInit } from "@angular/core";
import { LoanService } from "../loan.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { FileUploadService } from "src/app/layout/file-upload.service";
@Component({
  selector: "app-new-loan",
  templateUrl: "./new-loan.component.html",
  styleUrls: ["./new-loan.component.scss"],
})
export class NewLoanComponent implements OnInit {
  constructor(
    private database: LoanService,
    private uservice: FileUploadService,
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

  async addLoan(loanForm: Object) {
    loanForm["user_id"] = this.uid;
    let promisory_notes = await this.uservice.returnURLs(loanForm["files"]);
    delete loanForm["files"];
    loanForm["files"] = promisory_notes;
    console.log(loanForm);
    this.database.addLoan(loanForm);
    this.route.navigate(["loan/loan-list"]);
  }
  //Spinner for after we submit the form

  //With the files uploaded to A event EventEmitter or some shit like that here we will upload them to fireStorage and add them in the
  //add loan step.
}
