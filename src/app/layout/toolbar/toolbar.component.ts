import { Component, OnInit, EventEmitter, Output } from "@angular/core";

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
  constructor() {}

  ngOnInit() {}
}
