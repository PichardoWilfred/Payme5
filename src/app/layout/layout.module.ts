import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { MatIconModule } from "@angular/material/icon";
import { SidenavContentComponent } from "./sidenav/sidenav-content/sidenav-content.component";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { BottomNavComponent } from "./bottom-nav/bottom-nav.component";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    SidenavContentComponent,
    BottomNavComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SidenavComponent,
    MatToolbarModule,
    ToolbarComponent,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    BottomNavComponent,
    MatProgressSpinnerModule,
  ],
})
export class LayoutModule {}
