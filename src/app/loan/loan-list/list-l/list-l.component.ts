import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoanService } from "../../loan.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-l",
  templateUrl: "./list-l.component.html",
  styleUrls: ["./list-l.component.scss"],
})
export class ListLComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private loan: LoanService) {}
  @Output() loans = new EventEmitter<any>();
  loan$: Object[];
  showSpinner: boolean = true;
  noLoans: boolean;

  loanStateSubscription: Subscription;
  loanSubscription: Subscription;

  ngOnInit() {
    this.loanStateSubscription = this.auth.authState.subscribe((user) => {
      if (user) {
        this.loanSubscription = this.loan
          .getLoans(user.uid)
          .subscribe((loans) => {
            this.loan$ = loans;
            this.showSpinner = false;
            if (loans.length) {
              this.noLoans = false;
            } else {
              this.noLoans = true;
            }
            this.loans.emit(loans.length);
          });
      }
    });
  }

  ngOnDestroy() {
    this.loanStateSubscription.unsubscribe();
    this.loanSubscription.unsubscribe();
    this.loans.emit(0);
  }
}
