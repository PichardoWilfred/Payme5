import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payment-layout",
  templateUrl: "./payment-layout.component.html",
  styleUrls: ["./payment-layout.component.scss"],
})
export class PaymentLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  paymentNavBottom: Object[] = [
    { path: "payment-list", icon: "payment", title: "Pagos" },
  ];
}
