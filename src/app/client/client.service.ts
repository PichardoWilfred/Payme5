import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { SnackbarService } from "../layout/snackbar.service";
@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(
    private firestore: AngularFirestore,
    private snack: SnackbarService
  ) {
    this.ClientsCollection = this.firestore.collection("clients");
  }
  ClientsCollection: AngularFirestoreCollection<object>;
  //Get all Userclients
  getClients(uid: string) {
    return this.firestore
      .collection("clients", (ref) =>
        ref.where("uid", "==", uid).orderBy("name")
      )
      .valueChanges({ idField: "client_id" });
  }

  getAvailableClients(uid: string) {
    return this.firestore
      .collection("clients", (ref) =>
        ref.where("uid", "==", uid).where("active_loan", "==", false)
      )
      .valueChanges({ idField: "client_id" });
  }
  getClient(client_id: string) {
    return this.ClientsCollection.doc(client_id).valueChanges();
  }

  updateClient(client_id: string, data: object) {
    this.snack.bar("Cliente actualizado exitosamente", "OK");
    this.ClientsCollection.doc(client_id).update(data);
  }

  addClient(client: object) {
    this.snack.bar("Cliente agregado exitosamente", "OK");
    this.ClientsCollection.add(client);
  }
}
