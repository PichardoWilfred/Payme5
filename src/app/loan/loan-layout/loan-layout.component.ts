import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-loan-layout",
  templateUrl: "./loan-layout.component.html",
  styleUrls: ["./loan-layout.component.scss"],
})
export class LoanLayoutComponent implements OnInit {
  constructor(private authS: AuthService) {}

  ngOnInit() {
    this.authS.changeTitle("Préstamo");
  }
  loanNavBottom: Object[] = [
    { path: "loan-list", icon: "list", title: "Préstamos" },
    { path: "new-loan", icon: "note_add", title: "Nuevo Préstamo" },
  ];
}
