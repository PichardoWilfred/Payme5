import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoanService } from "../../loan.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-list-l",
  templateUrl: "./list-l.component.html",
  styleUrls: ["./list-l.component.scss"],
})
export class ListLComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private loan: LoanService) {}
  @Output() loans = new EventEmitter<any>();
  loan$: Observable<Object[]>;
  showSpinner: boolean = true;
  noLoans: boolean;

  style: string = "active";
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.loan$ = this.loan.getLoans(user.uid);
        this.loan$.subscribe((loans) => {
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
    this.loans.emit(0);
  }
}
