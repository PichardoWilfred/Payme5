import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GuarantorFormComponent } from "./guarantor-form/guarantor-form.component";
import { GuarantorListComponent } from "./guarantor-list/guarantor-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "../layout/layout.module";

@NgModule({
  declarations: [GuarantorFormComponent, GuarantorListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule],
  exports: [GuarantorFormComponent],
})
export class GuarantorModule {}
