import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout/layout.service";
import { GuarantorService } from "../guarantor.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore/firestore";
@Component({
  selector: "app-guarantor-detail",
  templateUrl: "./guarantor-detail.component.html",
  styleUrls: ["./guarantor-detail.component.scss"],
})
export class GuarantorDetailComponent implements OnInit {
  constructor(
    private layout: LayoutService,
    private guarantor: GuarantorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  guarantor_id: string;
  guarantor$: Observable<Object>;
  showSpinner: boolean = true;
  ngOnInit() {
    this.layout.toggleAuth(["detail"]);
    this.guarantor_id = this.route.snapshot.paramMap.get("id");
    this.guarantor$ = this.guarantor.getGuarantor(this.guarantor_id);
    this.guarantor$.subscribe((guarantor) => {
      this.showSpinner = false;
    });
  }
  updateGuarantor(guarantor) {
    this.guarantor.updateGuarantor(this.guarantor_id, guarantor);
  }
}
