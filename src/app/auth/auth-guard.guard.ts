import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { SnackbarService } from "../layout/snackbar.service";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private route: Router,
    private snack: SnackbarService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.authState.pipe(
      map((user) => {
        if (user) {
          if (user.emailVerified) {
            return true;
          } else {
            this.route.navigate(["auth/verify-email"]);
            return false;
          }
        } else {
          this.snack.bar(
            "Necesita iniciar sesión para acceder a esta ruta",
            "OK"
          );
          this.route.navigate(["auth/login"]);
          return false;
        }
      })
    );
  }
}
