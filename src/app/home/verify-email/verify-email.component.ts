import { Component, OnInit, OnDestroy } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.toggleAuth(["verify-email"]);
    this.layout.changeTitle("Verificar correo electrónico");
  }
  ngOnDestroy() {
    this.layout.toggleAuth(["logged"]);
  }
}
