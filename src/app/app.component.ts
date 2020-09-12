import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { LayoutService } from "./layout/layout.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private layout: LayoutService) {}
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.layout.toggleAuth(["logged"]);
      } else {
        this.layout.toggleAuth(["unlogged"]);
      }
    });
  }
  title = "Payme";
}
