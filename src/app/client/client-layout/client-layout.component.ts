import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-client-layout",
  templateUrl: "./client-layout.component.html",
  styleUrls: ["./client-layout.component.scss"],
})
export class ClientLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  clientNavBottom: Object[] = [
    { path: "client-list", icon: "group", title: "Clientes" },
    { path: "new-client", icon: "person_add", title: "Nuevo Cliente" },
  ];
}
