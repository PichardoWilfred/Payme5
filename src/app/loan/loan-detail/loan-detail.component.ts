import { Component, OnInit, OnDestroy, TemplateRef } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LoanService } from "../loan.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SnackbarService } from "src/app/layout/snackbar.service";
import { LayoutService } from "src/app/layout/layout.service";
@Component({
  selector: "app-loan-detail",
  templateUrl: "./loan-detail.component.html",
  styleUrls: ["./loan-detail.component.scss"],
})
export class LoanDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private db: LoanService,
    private router: Router,
    private modalService: BsModalService,
    private layout: LayoutService,
    private snack: SnackbarService
  ) {}
  loanSubscription: Subscription;
  showSpinner: boolean = true;
  modalRef: BsModalRef;
  loan$: Observable<Object>;
  loan_id: string;
  client_id: string;

  loan_completed: boolean;
  completed: boolean;
  ngOnInit() {
    this.layout.toggleAuth("detail");
    this.loan_id = this.route.snapshot.paramMap.get("id");
    this.loan$ = this.db.getLoan(this.loan_id);
    this.loan$.subscribe((loan) => {
      this.client_id = loan["client_id"];
      this.showSpinner = false;
      this.checkCompleted(loan);
    });
  }

  ngOnDestroy() {
    this.layout.toggleAuth("logged");
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(): void {
    this.db.disableLoan(this.client_id, this.loan_id, false);
    this.router.navigate(["loan/loan-list"]);
    this.modalRef.hide();
    this.snack.bar("El préstamo fue cancelado", "OK");
  }

  decline(): void {
    this.modalRef.hide();
  }
  checkCompleted(loan) {
    if (loan["state"] == "completed") {
      this.loan_completed = true;
    } else {
      this.loan_completed = false;
    }
    if (loan["active"] == true) {
      this.completed = false;
    } else {
      this.completed = true;
    }
  }

  completeLoan() {
    this.db.disableLoan(this.client_id, this.loan_id, true);
  }
}
