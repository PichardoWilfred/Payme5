import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ClientService } from "../client.service";
import { switchMap } from "rxjs/operators";
@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"],
})
export class ClientDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private db: ClientService,
    private router: Router
  ) {}
  ngOnInit() {
    this.db.toggleBottomNav(false);
    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.db.getClient(params.get("id")))
    );
    this.client_id = this.route.snapshot.paramMap.get("id");
  }
  ngOnDestroy() {
    this.db.toggleBottomNav(true);
  }
  client$: Observable<Object>;
  client_id: string;

  updateClient(clientData: Object) {
    this.db.updateClient(this.client_id, clientData);
    this.router.navigate(["client/client-list"]);
  }
}
