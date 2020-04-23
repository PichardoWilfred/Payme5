import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./auth/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private authS: AuthService, private auth: AngularFireAuth) {
    // this.user = this.authS.user$;
    // this.user.subscribe(console.log);
  }
  title = "Payme";
  user: any = true;
}
