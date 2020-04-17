import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//Routing
import { ClientRoutingModule } from "./client-routing.module";

import { ClientListComponent } from "./client-list/client-list.component";
import { NewClientComponent } from "./new-client/new-client.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";
import { ClientLayoutComponent } from "./client-layout/client-layout.component";
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    ClientListComponent,
    NewClientComponent,
    ClientDetailComponent,
    ClientLayoutComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule
  ],
})
export class ClientModule {}
