import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "../client.service";
import { AuthService } from "../../auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit {
  constructor(
    private db: ClientService,
    private auth: AuthService,
    private af: AngularFireAuth
  ) {}
  client$: Observable<Object[]>;
  ngOnInit() {
    this.af.authState.subscribe((user) => {
      if (user) {
        this.client$ = this.db.getClients(user.uid);
      }
    });
  }
}
