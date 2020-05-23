import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-loan-layout",
  templateUrl: "./loan-layout.component.html",
  styleUrls: ["./loan-layout.component.scss"],
})
export class LoanLayoutComponent implements OnInit {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.changeTitle("Préstamos");
  }
  loanNavBottom: Object[] = [
    { path: "loan-list", icon: "list", title: "Préstamos" },
    { path: "new-loan", icon: "note_add", title: "Nuevo Préstamo" },
  ];
}
