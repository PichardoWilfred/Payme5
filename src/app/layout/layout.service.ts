import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  constructor(private firestore: AngularFirestore) {}
  // Toolbar titles
  private title = new BehaviorSubject("");
  actualTitle = this.title.asObservable();

  changeTitle(message: string) {
    this.title.next(message);
  }

  // //Toolbar content
  private toolbarAuth = new BehaviorSubject("");
  toolbarContent = this.toolbarAuth.asObservable();

  toggleAuth(state: string) {
    this.toolbarAuth.next(state);
  }

  getUser(id) {
    return this.firestore.collection("users").doc(id).valueChanges();
  }
}
