import { Component, OnInit } from "@angular/core";
import { ClientService } from "../client.service";
@Component({
  selector: "app-client-layout",
  templateUrl: "./client-layout.component.html",
  styleUrls: ["./client-layout.component.scss"],
})
export class ClientLayoutComponent implements OnInit {
  constructor(private toggle: ClientService) {}
  showNavBottom: Boolean;
  ngOnInit() {
    this.toggle.showBottomNav.subscribe((data) => (this.showNavBottom = data));
  }
  clientNavBottom: Object[] = [
    { path: "client-list", icon: "group", title: "Clientes" },
    { path: "new-client", icon: "person_add", title: "Nuevo Cliente" },
  ];
}
