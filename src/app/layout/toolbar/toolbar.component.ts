import { Component, OnInit, EventEmitter, Output } from "@angular/core";
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
  welcomeView: boolean;
  toggleSideBar(toggle: boolean) {
    this.toggleEvent.emit(toggle);
  }
  constructor(private layout: LayoutService, private location: Location) {}

  ngOnInit() {
    this.layout.toolbarContent.subscribe((state) => {
      this.state = state;
      if (state == "welcome") {
        this.welcomeView = true;
      }
    });
    this.layout.actualTitle.subscribe((title) => {
      this.toolTitle = title;
    });
  }

  back() {
    this.location.back();
  }
}
