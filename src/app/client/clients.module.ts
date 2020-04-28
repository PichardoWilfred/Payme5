import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module"; //Routing

import { ClientListComponent } from "./client-list/client-list.component";
import { NewClientComponent } from "./new-client/new-client.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";
import { ClientLayoutComponent } from "./client-layout/client-layout.component";
import { LayoutModule } from "../layout/layout.module";
import { ListComponent } from "./client-list/list-c/list.component";
import { ClientFormComponent } from "./client-layout/client-form/client-form.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms"; //Forms
import { AuthGuardGuard } from "../auth/auth-guard.guard";

@NgModule({
  declarations: [
    ClientListComponent,
    NewClientComponent,
    ClientDetailComponent,
    ClientLayoutComponent,
    ListComponent,
    ClientFormComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ClientListComponent],
})
export class ClientModule {}
