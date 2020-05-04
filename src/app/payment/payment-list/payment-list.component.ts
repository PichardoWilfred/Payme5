import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { PaymentService } from "src/app/payment/payment.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-payment-list",
  templateUrl: "./payment-list.component.html",
  styleUrls: ["./payment-list.component.scss"],
})
export class PaymentListComponent implements OnInit {
  constructor(private payment: PaymentService, private auth: AngularFireAuth) {}
  payment$: Observable<Object[]>;
  showSpinner: boolean = true;
  noPayments: boolean;
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.payment$ = this.payment.getAllPayments(user.uid);
        this.payment$.subscribe((payments) => {
          this.showSpinner = false;
          if (payments.length) {
            this.noPayments = false;
          } else {
            this.noPayments = true;
          }
        });
      }
    });
  }

  
}
