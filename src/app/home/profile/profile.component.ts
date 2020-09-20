import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { LayoutService } from "src/app/layout/layout.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { HomeService } from "../home.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private layout: LayoutService,
    private home: HomeService,
    private af: AngularFireAuth
  ) {}

  ngOnInit() {
    this.layout.toggleAuth(["back"]);
    this.af.authState.subscribe((user) => {
      this.user$ = this.home.getUser(user.uid);
    });
  }
  ngOnDestroy() {
    this.layout.toggleAuth(["logged"]);
  }
  user$: Observable<Object>;
  default: Object = {};
}
