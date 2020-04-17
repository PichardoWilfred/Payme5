import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loan-list",
  templateUrl: "./loan-list.component.html",
  styleUrls: ["./loan-list.component.scss"],
})
export class LoanListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  loans: Object[] = [
    {
      nombre_completo: "Wilfredo Almonte",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
    {
      nombre_completo: "Wilfredo Almente",
      date: "22/03/2020",
    },
  ];
}
