import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  showFiller: Boolean = false;
  ToolbarTitle: string = "Inicio";

  navigate(sidenav: any) {
    sidenav.toggle();
  }
}
