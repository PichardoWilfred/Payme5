import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  constructor(private authS: AuthService) {}
  ngOnInit() {
    this.authS.actualTitle.subscribe((title) => {
      this.toolbarTitle = title;
    });
  }

  showFiller: Boolean = false;
  toolbarTitle: string;

  navigate(sidenav: any) {
    sidenav.toggle();
  }
}
