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
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatExpansionModule } from "@angular/material/expansion";
import { ImgUploaderComponent } from "./img-uploader/img-uploader.component";
import { UploadTaskComponent } from "./img-uploader/upload-task/upload-task.component";
import { ImgDropDirective } from "./img-drop.directive";
@NgModule({
  declarations: [
    ImgDropDirective,
    SidenavComponent,
    ToolbarComponent,
    SidenavContentComponent,
    BottomNavComponent,
    ImgUploaderComponent,
    UploadTaskComponent,
  ],
  imports: [
    MatExpansionModule,
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatStepperModule,
    ScrollingModule,
  ],
  exports: [
    MatStepperModule,
    UploadTaskComponent,
    ScrollingModule,
    SidenavComponent,
    MatProgressBarModule,
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
    MatExpansionModule,
    ImgUploaderComponent,
    ImgDropDirective,
  ],
})
export class LayoutModule {}
