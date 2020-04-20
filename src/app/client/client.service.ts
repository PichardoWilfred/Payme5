import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private firestore: AngularFirestore) {
    this.clientCollection = firestore.collection("clients");
  }
  clientCollection: AngularFirestoreCollection;
  //Get all UserClients
  getClients() {
    return this.clientCollection.valueChanges({ idField: "client_id" });
  }

  getClient(client_id: string) {
    return this.firestore.collection("clients").doc(client_id).valueChanges();
  }

  updateClient(client_id: string, data: Object) {
    this.firestore.collection("clients").doc(client_id).update(data);
  }

  addClient(client: Object) {
    this.clientCollection.add(client);
  }

  //Toggle the display of BottomNav
  source = new BehaviorSubject<Boolean>(true);
  showBottomNav = this.source.asObservable();
  toggleBottomNav(state: Boolean) {
    this.source.next(state);
  }
}
