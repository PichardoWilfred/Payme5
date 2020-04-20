import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "../../client.service";
@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private clients: ClientService) {}
  client$: Observable<Object[]>;
  showSpinner: Boolean = true;
  ngOnInit() {
    this.client$ = this.clients.getClients();
    this.client$.subscribe((data) => {
      this.showSpinner = false;
    });
  }
}
