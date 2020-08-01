import { Component, OnInit } from "@angular/core";
import { GuarantorService } from "src/app/guarantor/guarantor.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ClientService } from "../client.service";
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: "app-new-guarantor",
  templateUrl: "./new-guarantor.component.html",
  styleUrls: ["./new-guarantor.component.scss"],
})
export class NewGuarantorComponent implements OnInit {
  constructor(
    private guarantor: GuarantorService,
    private route: ActivatedRoute,
    private clientS: ClientService,
    private layout: LayoutService
  ) { }

  ngOnInit() {
    this.client_id = this.route.snapshot.paramMap.get("id");
    this.layout.toggleAuth("detail");

    this.clientS.getClient(this.client_id).subscribe((client) => {
      this.client_email = client["email"];
      this.client_name = client["name"];
    });
  }

  client_id: string;
  client: Observable<Object>;
  client_name: string;
  client_email: string;

  addGuarantor(guarantor: Object) {
    let new_guarantor = {
      ...guarantor,
      client_id: this.client_id,
      client_name: this.client_name,
      client_email: this.client_email,
    };
    this.guarantor.addGuarantor(new_guarantor);
  }
}
