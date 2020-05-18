import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthHandlerService } from "./auth-layout/err-handler/auth-handler.service";
import { SnackbarService } from "../layout/snackbar.service";
import { BehaviorSubject } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    public router: Router,
    private db: AngularFirestore,
    private err: AuthHandlerService,
    private snack: SnackbarService
  ) {}

  //Toolbar titles
  private title = new BehaviorSubject("");
  actualTitle = this.title.asObservable();

  changeTitle(message: string) {
    this.title.next(message);
  }

  //Toolbar content
  private toolbarAuth = new BehaviorSubject(false);
  toolbarContent = this.toolbarAuth.asObservable();
  
  toggleAuth(state: boolean) {
    this.toolbarAuth.next(state);
  }

  async register(user: any) {
    try {
      let res = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      this.snack.bar("Usuario registrado", "OK");
      this.router.navigate(["client/client-list"]);
      this.db.collection("users").doc(res.user.uid).set(user);
    } catch (err) {
      this.err.registerHandler(err);
    }
  }

  async login(user: any) {
    try {
      await this.auth.signInWithEmailAndPassword(user.email, user.password);
      this.router.navigate(["client/client-list"]);
    } catch (err) {
      this.err.loginHandler(err);
    }
  }

  async logout() {
    this.router.navigate(["auth/login"]);
    await this.auth.signOut();
  }
}
