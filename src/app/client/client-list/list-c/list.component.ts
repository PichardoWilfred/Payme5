import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";
import { Observable } from "rxjs";
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
    this.af.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.client$ = this.db.getClients(user.uid);
        this.client$.subscribe((clients) => {
          this.showSpinner = false;
          if (clients.length > 1) {
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
    this.clients.emit(0);
  }
  uid: string;
  client$: Observable<Object[]>;
  showSpinner: boolean = true;
  noClients: boolean;
}
