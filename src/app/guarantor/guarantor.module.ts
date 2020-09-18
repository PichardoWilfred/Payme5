import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GuarantorFormComponent } from "./guarantor-form/guarantor-form.component";
import { GuarantorListComponent } from "./guarantor-list/guarantor-list.component";
import { GuarantorDetailComponent } from "./guarantor-detail/guarantor-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "../layout/layout.module";
import { RouterModule } from "@angular/router";

import { NgxMaskModule } from "ngx-mask";
@NgModule({
  declarations: [
    GuarantorFormComponent,
    GuarantorListComponent,
    GuarantorDetailComponent,
  ],

  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [GuarantorFormComponent, GuarantorListComponent],
})
export class GuarantorModule {}
