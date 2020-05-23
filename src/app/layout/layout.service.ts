import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  constructor() {}
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
}
