import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-payment-list",
  templateUrl: "./payment-list.component.html",
  styleUrls: ["./payment-list.component.scss"],
})
export class PaymentListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  payments: Object[] = [
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
    {
      name: "Wilfredo Almonte",
      date: "22/03/2020",
      amount: "10.00",
    },
  ];
}
