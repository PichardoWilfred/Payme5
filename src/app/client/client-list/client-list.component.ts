import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"],
})
export class ClientListComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  clientsLength: any;
  showSpinner: boolean = true;

  setLength(length: number) {
    this.clientsLength = length.toString();
    this.showSpinner = false;
    
  }
}
