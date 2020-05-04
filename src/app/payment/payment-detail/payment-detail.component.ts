import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { PaymentService } from "../payment.service";

@Component({
  selector: "app-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styleUrls: ["./payment-detail.component.scss"],
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private payment: PaymentService
  ) {}
  showSpinner: boolean = true;
  payment_id: string;
  payment$: Observable<Object>;

  ngOnInit() {
    this.payment_id = this.route.snapshot.paramMap.get("id");
    this.payment$ = this.payment.getPayment(this.payment_id);
    this.payment$.subscribe((payment) => {
      console.log(payment);
      this.showSpinner = false;
    });
  }
}
