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
  async register(user: any) {
    try {
      let res = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      this.snack.bar("Usuario registrado", "OK");
      this.router.navigate(["client/client-list"]);
      await this.sendVerifcationEmail();
      this.db.collection("users").doc(res.user.uid).set(user);
    } catch (err) {
      this.err.registerHandler(err);
    }
  }

  async login({ email, password }) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(["client/client-list"]);
    } catch (err) {
      this.err.loginHandler(err);
    }
  }

  isEmailVerified(user: any) {
    return user.emailVerified === true ? true : false;
  }
  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.auth.currentUser).sendEmailVerification();
    } catch (error) {}
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(["auth/login"]);
  }
}
