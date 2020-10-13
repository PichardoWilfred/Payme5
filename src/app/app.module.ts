import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "./layout/layout.module"; //Layout

import { environment } from "../environments/environment"; //FirebaseModules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AuthGuardGuard } from "./auth/auth-guard.guard";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxMaskModule } from "ngx-mask";
import { NgxMaterialToolsModule } from "ngx-material-tools";

import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es-DO";
registerLocaleData(localeEs, "es-DO");

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NgxMaterialToolsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [AuthGuardGuard, { provide: LOCALE_ID, useValue: "es-DO" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
