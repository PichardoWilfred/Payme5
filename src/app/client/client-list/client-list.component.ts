import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "../client.service";
@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit {
  constructor(private clients: ClientService) {}
  clients$: Observable<any[]>;
  showSpinner: Boolean = true;
  ngOnInit() {
    this.clients$ = this.clients.getClients();
    this.clients$.subscribe( () => this.showSpinner = false)
  }
}
