import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "../client.service";
import { AuthService } from "../../auth/auth.service";
@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit {
  constructor(private db: ClientService, private auth: AuthService) {}
  client$: Observable<Object[]>;
  ngOnInit() {
    this.client$ = this.db.getClients();
  }
}
