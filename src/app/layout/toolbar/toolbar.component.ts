import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleSideBar(toggle: boolean) {
    this.toggleEvent.emit(toggle);
  }
  constructor(private auth: AuthService, private router: Router) {}

  async logout() {
    this.router.navigate(["auth/login"]);
    await this.auth.logout();
  }
  ngOnInit() {}
}
