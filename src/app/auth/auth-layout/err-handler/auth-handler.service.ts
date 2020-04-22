import { Injectable } from "@angular/core";
import { SnackbarService } from "../../../layout/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class AuthHandlerService {
  constructor(private snack: SnackbarService) {}

  loginHandler(err: any) {
    switch (err.code) {
      case "auth/argument-error": {
        this.snack.bar("Correo o contraseña incorrectos/as", "OK");
        break;
      }
      default: {
        console.log("❗❗Copiar:\n", err);
        break;
      }
    }
    //auth/argument-error
  }

  registerHandler(err: any) {
    switch (err.code) {
      case "auth/email-already-in-use": {
        this.snack.bar("Ese correo ya está en uso", "OK");
        break;
      }
      case "The password must be 6 characters long or more.": {
        this.snack.bar("Su contraseña es muy corta", "OK");
        break;
      }
      default: {
        console.log("❗❗Copiar:\n", err.message);
        break;
      }
    }
  }
}
