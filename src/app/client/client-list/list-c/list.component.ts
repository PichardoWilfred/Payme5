import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { ClientService } from "../../client.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  @Output() clients = new EventEmitter<any>();
  constructor(private db: ClientService, private af: AngularFireAuth) {}
  ngOnInit() {
    this.stateSubscription = this.af.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.clientSubscription = this.db
          .getClients(user.uid)
          .subscribe((clients) => {
            this.client$ = clients;
            this.showSpinner = false;

            if (clients.length) {
              this.noClients = false;
            } else {
              this.noClients = true;
            }
            this.clients.emit(clients.length);
          });
      }
    });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.clientSubscription.unsubscribe();
    this.clients.emit(0);
  }
  stateSubscription: Subscription;
  clientSubscription: Subscription;
  uid: string;
  client$: Object[];
  showSpinner: boolean = true;
  noClients: boolean;

  noLoanFilter() {
    this.client$ = this.client$.filter((clients) => {
      return clients["active_loan"] == false;
    });
  }
  loanFilter() {
    this.client$ = this.client$.filter((clients) => {
      return clients["active_loan"] == true;
    });
  }
}
