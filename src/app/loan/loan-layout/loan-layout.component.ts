import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loan-layout",
  templateUrl: "./loan-layout.component.html",
  styleUrls: ["./loan-layout.component.scss"],
})
export class LoanLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  loanNavBottom: Object[] = [
    { path: "loan-list", icon: "list", title: "Préstamos" },
    { path: "new-loan", icon: "note_add", title: "Nuevo Préstamo" },
  ];
}
