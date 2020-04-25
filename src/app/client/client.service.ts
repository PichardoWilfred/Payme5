import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { SnackbarService } from "../layout/snackbar.service";
@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(
    private firestore: AngularFirestore,
    private snack: SnackbarService
  ) {}
  //Get all UserClients
  getClients(uid: string) {
    return this.firestore
      .collection("clients", (ref) => ref.where("uid", "==", uid))
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
