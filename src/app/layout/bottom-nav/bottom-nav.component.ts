import { Component, OnInit, Input } from "@angular/core";
import { LayoutService } from "../layout.service";

@Component({
  selector: "app-bottom-nav",
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.scss"],
})
export class BottomNavComponent implements OnInit {
  @Input() options: [];
  state: string;
  constructor(private layout: LayoutService) {}
  ngOnInit() {
    this.layout.toolbarContent.subscribe((state) => {
      this.state = state;
    });
  }
}
