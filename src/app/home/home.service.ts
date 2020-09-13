import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private firestore: AngularFirestore) {}
  //Get all Userclients
  getUser(uid: string) {
    return this.firestore.collection("users").doc(uid).valueChanges();
  }
}
