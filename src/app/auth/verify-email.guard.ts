import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { SnackbarService } from "../layout/snackbar.service";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class VerifyEmailGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private route: Router) {}
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
          if (!user.emailVerified) {
            this.route.navigate(["auth/verify-email"]);
            return false;
          } else {
            return true;
          }
        }
      })
    );
    //
  }
}
