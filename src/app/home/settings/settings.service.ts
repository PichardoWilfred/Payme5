import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private firestore: AngularFirestore) {
    this.UsersCollection = this.firestore.collection("users");
  }
  UsersCollection: AngularFirestoreCollection<object>;

  getUser(user_id: string) {
    return this.UsersCollection.doc(user_id).valueChanges();
  }

  updateUser(user_id: string, data: object) {
    this.UsersCollection.doc(user_id).update({ settings: data });
  }
}
