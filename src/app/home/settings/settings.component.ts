import { Component, OnInit, OnDestroy } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";
import { SettingsService } from "./settings.service";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  constructor(
    private layout: LayoutService,
    private db: SettingsService,
    private route: Router,
    private auth: AngularFireAuth,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.layout.toggleAuth(["logged"]);
    this.layout.changeTitle("Configuración");

    this.auth.authState.subscribe((user) => {
      this.user_id = user.uid;
      this.user$ = this.settings.getUser(user.uid);
    });
  }
  user_id: string;
  user$: Observable<Object>;
  saveSettings(settingsData: Object) {
    this.db.updateUser(this.user_id, settingsData);
  }
}
