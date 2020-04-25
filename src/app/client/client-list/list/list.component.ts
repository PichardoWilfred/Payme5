import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "../../client.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/auth/auth.service";
import { map } from "rxjs/operators";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, AfterViewInit {
  constructor(private clients: ClientService, private auth: AngularFireAuth) {}
  client$: Observable<Object[]>;
  showSpinner: boolean = true;
  noClients: boolean;
  ngOnInit() {}

  ngAfterViewInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.client$ = this.clients.getClients(user.uid);
        this.client$.subscribe((client) => {
          if (client.length) {
            this.noClients = false;
          } else {
            this.noClients = true;
          }
        });
        this.showSpinner = false;
      }
    });
  }
}
