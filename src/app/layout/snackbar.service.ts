import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  private config: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ["snackbar-action"],
  };

  bar(message: string, action: string) {
    this._snackBar.open(message, action, this.config);
  }
  bar10s(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: ["snackbar-action"],
    });
  }
}
