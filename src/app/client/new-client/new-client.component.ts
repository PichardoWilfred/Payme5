import { Component, OnInit } from "@angular/core";
import { ClientService } from "../client.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.component.html",
  styleUrls: ["./new-client.component.scss"],
})
export class NewClientComponent implements OnInit {
  constructor(
    private db: ClientService,
    private route: Router,
    private fireAuth: AngularFireAuth
  ) {}
  ngOnInit() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }
  uid: any;
  Default: Object = {};
  newClient(clientData: Object) {
    clientData["uid"] = this.uid;
    clientData["active_loan"] = false;
    this.db.addClient(clientData);
    this.route.navigate(["client/client-list"]);
  }
}
