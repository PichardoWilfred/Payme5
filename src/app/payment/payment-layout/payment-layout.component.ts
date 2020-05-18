import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-payment-layout",
  templateUrl: "./payment-layout.component.html",
  styleUrls: ["./payment-layout.component.scss"],
})
export class PaymentLayoutComponent implements OnInit {
  constructor(private authS: AuthService) {}

  ngOnInit() {
    this.authS.changeTitle("Pagos realizados");
  }
  paymentNavBottom: Object[] = [
    { path: "payment-list", icon: "payment", title: "Pagos" },
  ];
}
