import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-payment-layout",
  templateUrl: "./payment-layout.component.html",
  styleUrls: ["./payment-layout.component.scss"],
})
export class PaymentLayoutComponent implements OnInit {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.changeTitle("Pagos");
  }
  paymentNavBottom: Object[] = [
    { path: "payment-list", icon: "attach_money", title: "Pagos" },
  ];
}
