import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientListComponent } from "./client-list/client-list.component";
import { NewClientComponent } from "./new-client/new-client.component";
import { ClientDetailComponent } from "./client-detail/client-detail.component";
import { ClientLayoutComponent } from "./client-layout/client-layout.component";
import { NewGuarantorComponent } from "./new-guarantor/new-guarantor.component";

const clientRoutes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      { path: "new-client", component: NewClientComponent },
      { path: "client-list", component: ClientListComponent },
      { path: ":id", component: ClientDetailComponent },
      { path: ":id/new-guarantor", component: NewGuarantorComponent },

      { path: "", redirectTo: "/client/client-list" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
