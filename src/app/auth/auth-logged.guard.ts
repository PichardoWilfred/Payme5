import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthLoggedGuard implements CanActivate {
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
          if (user.emailVerified) {
            return false;
          }
          return true;
        }
        return true;
      })
    );
  }
}
