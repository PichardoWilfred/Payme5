import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-home-layout",
  templateUrl: "./home-layout.component.html",
  styleUrls: ["./home-layout.component.scss"],
})
export class HomeLayoutComponent implements OnInit {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.changeTitle("Inicio");
  }

  homeNavBottom: Object[] = [{ path: "about", icon: "home", title: "Inicio" }];
}
