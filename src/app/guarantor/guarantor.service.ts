import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class GuarantorService {
  constructor(private firestore: AngularFirestore) {}

  getGuarantors(id) {
    return this.firestore
      .collection("guarantors", (ref) => ref.where("client_id", "==", id))
      .valueChanges({ idField: "guarantor_id" });
  }

  getGuarantor(id) {
    return this.firestore.collection("guarantors").doc(id).valueChanges();
  }

  addGuarantor(guarantor) {
    this.firestore
      .collection("guarantors")
      .doc(guarantor["guarantor_id"])
      .set(guarantor);
  }
}
