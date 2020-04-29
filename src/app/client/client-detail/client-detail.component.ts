import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "../client.service";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private db: ClientService,
    private router: Router
  ) {}
  clientSubscription: Subscription;
  showSpinner: boolean = true;
  ngOnInit() {
    this.db.toggleBottomNav(false); //este es el Behavior Subject del NavBottom
    this.client_id = this.route.snapshot.paramMap.get("id");
    this.clientSubscription = this.db
      .getClient(this.client_id)
      .subscribe((client) => {
        this.client$ = client;
        this.showSpinner = false;
      });
  }
  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
    this.db.toggleBottomNav(true);
  }
  client$: Object;
  client_id: string;

  updateClient(clientData: Object) {
    this.db.updateClient(this.client_id, clientData);
    this.router.navigate(["client/client-list"]);  
  }
}
