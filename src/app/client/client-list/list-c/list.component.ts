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
import * as _ from "lodash";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  @Output() clients = new EventEmitter<any>();
  constructor(private db: ClientService, private af: AngularFireAuth) { }
  ngOnInit() {

    this.af.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.client$ = this.db.getClients(user.uid);
        this.client$.subscribe((clients) => {
          this.listed_clients = clients
          this.applyFilters();

          this.showSpinner = false;
          if (clients.length) {
            this.theresNotClients = false;
          } else {
            this.theresNotClients = true;
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
  theresNotClients: boolean;
  listed_clients: any;


  f_clients: any;
  filters: Object = {};


  private applyFilters() {
    this.f_clients = _.filter(this.listed_clients, _.conforms(this.filters));
  }

  private filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();

  }

  private filter_options: Object[] = [
    { active_loan: true, label: "Con préstamo activo" },
    { active_loan: false, label: "Sin préstamo activo" },
  ]

  private current_filter: boolean;
  private testing_client: Object[] = [{active_loan:true,name:"Wilfred Gabriel Pichardo"}]

}
