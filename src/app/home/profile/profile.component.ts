import { Component, OnInit, OnDestroy } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.toggleAuth(["back"]);
  }
  ngOnDestroy() {
    this.layout.toggleAuth(["logged"]);
  }
}
