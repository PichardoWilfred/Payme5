import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { PaymentService } from "../payment.service";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styleUrls: ["./payment-detail.component.scss"],
})
export class PaymentDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private payment: PaymentService,
    private layout: LayoutService
  ) {}
  showSpinner: boolean = true;
  payment_id: string;
  payment$: Observable<Object>;

  ngOnInit() {
    this.layout.toggleAuth(["detail", "attach_money", "payment"]);
    this.payment_id = this.route.snapshot.paramMap.get("id");
    this.payment$ = this.payment.getPayment(this.payment_id);
    this.payment$.subscribe((payment) => {
      this.showSpinner = false;
    });
  }
  ngOnDestroy() {
    this.layout.toggleAuth(["logged"]);
  }
}
