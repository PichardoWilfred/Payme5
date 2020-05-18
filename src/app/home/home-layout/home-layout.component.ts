import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-home-layout",
  templateUrl: "./home-layout.component.html",
  styleUrls: ["./home-layout.component.scss"],
})
export class HomeLayoutComponent implements OnInit {
  constructor(private authS: AuthService) {}

  ngOnInit() {
    this.authS.changeTitle("Inicio");
  }

  homeNavBottom: Object[] = [
    { path: "about", icon: "home", title: "Inicio" },
  ];
}
