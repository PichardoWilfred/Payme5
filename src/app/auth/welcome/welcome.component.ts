import { Component, OnInit, OnDestroy } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.toggleAuth(["unlogged"]);
  }
  ngOnDestroy() {
    this.layout.toggleAuth([""]);
    this.layout.changeTitle("");
  }
}
