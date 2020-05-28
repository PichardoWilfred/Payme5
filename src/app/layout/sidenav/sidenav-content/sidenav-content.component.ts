import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { LayoutService } from "../../layout.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-sidenav-content",
  templateUrl: "./sidenav-content.component.html",
  styleUrls: ["./sidenav-content.component.scss"],
})
export class SidenavContentComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private layout: LayoutService
  ) {}
  @Output() toggleNavigate = new EventEmitter<Object>();
  @Output() toolBarTitle = new EventEmitter();
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = this.layout.getUser(user.uid);
      }
    });
  }
  user: Observable<Object>;

  routes: Object[] = [
    { icon: "home", path: "/home/about", name: "Inicio" },
    { icon: "work", path: "/loan/loan-list", name: "Préstamos" },
    { icon: "people_alt", path: "/client", name: "Clientes" },
    { icon: "attach_money", path: "/payment/payment-list", name: "Pagos" },
  ];

  navigateTo(route: String, routeRoot: String) {
    this.router.navigate([route]);
    this.toggleNavigate.emit(true);
    this.toolBarTitle.emit(routeRoot);
  }
}
