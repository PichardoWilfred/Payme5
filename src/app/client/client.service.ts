import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  
  constructor(private firestore: AngularFirestore) {
    this.clientCollection = firestore.collection("clients");
  }
  clientCollection: AngularFirestoreCollection;
  client$: Observable<any[]>;

  getClients() {
    return this.clientCollection.valueChanges();
  }
}
