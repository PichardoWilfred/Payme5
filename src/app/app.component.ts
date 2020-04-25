import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private authS: AuthService, private auth: AngularFireAuth) {}
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
  }
  title = "Payme";
  user: any;
}
