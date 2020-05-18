import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { PaymentService } from "../payment.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styleUrls: ["./payment-detail.component.scss"],
})
export class PaymentDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payment: PaymentService,
    private authS: AuthService
  ) {}
  showSpinner: boolean = true;
  payment_id: string;
  payment$: Observable<Object>;

  ngOnInit() {
    this.authS.toggleAuth("detail");
    this.payment_id = this.route.snapshot.paramMap.get("id");
    this.payment$ = this.payment.getPayment(this.payment_id);
    this.payment$.subscribe((payment) => {
      this.showSpinner = false;
    });
  }
  ngOnDestroy() {
    this.authS.toggleAuth("logged");
  }
}
