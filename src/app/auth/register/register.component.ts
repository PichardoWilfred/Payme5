import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { LayoutService } from "src/app/layout/layout.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private layout: LayoutService) {}
  ngOnInit() {
    this.layout.changeTitle("Crear usuario");
    this.layout.toggleAuth(["unlogged"]);
  }

  Default: Object = {};
  async register(userData: Object) {
    userData["created_at"] = new Date();
    userData["settings"] = {
      guarantor_minimal_amount: 20000,
    };
    await this.auth.register(userData);
  }
}
