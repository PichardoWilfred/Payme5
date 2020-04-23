import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { SnackbarService } from "../layout/snackbar.service";
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private snack: SnackbarService
  ) {}
  uid: string;
  //Get all UserClients
  getClients() {
    return this.firestore
      .collection("clients", (ref) =>
        ref.where("uid", "==", "2zPWEEQ9kZQtva3aI9TwY7ZAy1p1")
      )
      .valueChanges({ idField: "client_id" });
  }

  getClient(client_id: string) {
    return this.firestore.collection("clients").doc(client_id).valueChanges();
  }

  updateClient(client_id: string, data: Object) {
    this.snack.bar("Cliente actualizado exitosamente", "OK");
    this.firestore.collection("clients").doc(client_id).update(data);
  }

  addClient(client: Object) {
    this.snack.bar("Cliente agregado exitosamente", "OK");
    this.firestore.collection("clients").add(client);
  }

  //Toggle the display of BottomNav
  source = new BehaviorSubject<Boolean>(true);
  showBottomNav = this.source.asObservable();
  toggleBottomNav(state: Boolean) {
    this.source.next(state);
  }
}
