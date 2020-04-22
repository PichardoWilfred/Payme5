import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthHandlerService } from "./auth-layout/err-handler/auth-handler.service";
import { SnackbarService } from "../layout/snackbar.service";

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
  ) {
    this.auth.authState.subscribe((user) => {
      this.user = user ? user : null;
    });
  }
  user: User;
  async register(user: any) {
    try {
      let res = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      this.snack.bar("Usuario registrado", "CERRAR");
      this.router.navigate(["auth/login"]);
      user["user_id"] = res.user.uid;
      this.db.collection("users").doc(res.user.uid).set(user);
    } catch (err) {
      this.err.registerHandler(err);
    }
  }

  async login(user: any) {
    try {
      let res = await this.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (err) {
      this.err.loginHandler(err);
    }
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(["auth/login"]);
  }
}
