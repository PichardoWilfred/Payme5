import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "../client.service";
import { LayoutService } from "src/app/layout/layout.service";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private db: ClientService,
    private router: Router,
    private layout: LayoutService
  ) {}

  client$: Observable<Object>;
  showSpinner: boolean = true;
  hasLoan: boolean;

  ngOnInit() {
    this.layout.toggleAuth("detail");
    this.client_id = this.route.snapshot.paramMap.get("id");

    this.client$ = this.db.getClient(this.client_id);
    this.client$.subscribe((client) => {
      this.showSpinner = false;
      this.hasLoan = client["loan_id"].length ? true : false;
    });
  }
  ngOnDestroy() {
    this.layout.toggleAuth("logged");
  }
  client_id: string;

  updateClient(clientData: Object) {
    this.db.updateClient(this.client_id, clientData);
    this.router.navigate(["client/client-list"]);
  }
}
