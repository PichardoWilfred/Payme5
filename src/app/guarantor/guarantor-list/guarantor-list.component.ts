import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { GuarantorService } from "../guarantor.service";

@Component({
  selector: "guarantor-list",
  templateUrl: "./guarantor-list.component.html",
  styleUrls: ["./guarantor-list.component.scss"],
})
export class GuarantorListComponent implements OnInit {
  constructor(private guarantor: GuarantorService) {}
  @Input() client_id: Observable<Object>;
  showSpinner: boolean = true;
  noGuarantors: boolean = false;
  guarantors: Observable<Object[]>;

  ngOnInit() {
    this.guarantors = this.guarantor.getGuarantors(this.client_id);
    this.guarantors.subscribe((guarantors) => {
      this.showSpinner = false;
      if (guarantors.length < 1) {
        this.noGuarantors = true;
      }
    });
  }
}
