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
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
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
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
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
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
})
export class LayoutModule {}
