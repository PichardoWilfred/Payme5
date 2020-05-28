import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { LayoutService } from "../layout.service";
@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>();
  state: string;
  toolTitle: string;
  toggleSideBar(toggle: boolean) {
    this.toggleEvent.emit(toggle);
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private layout: LayoutService,
    private location: Location
  ) {}

  async logout() {
    this.layout.changeTitle("")
    await this.auth.logout();
    this.router.navigate(["auth/login"]);
  }
  ngOnInit() {
    this.layout.toolbarContent.subscribe((state) => {
      this.state = state;
    });
    this.layout.actualTitle.subscribe((title) => {
      this.toolTitle = title;
    });
  }

  back() {
    this.location.back();
  }
}
