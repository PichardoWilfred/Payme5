import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-sidenav-content",
  templateUrl: "./sidenav-content.component.html",
  styleUrls: ["./sidenav-content.component.scss"],
})
export class SidenavContentComponent implements OnInit {
  constructor(private router: Router) {}
  @Output() toggleNavigate = new EventEmitter<Object>();
  @Output() toolBarTitle = new EventEmitter();
  ngOnInit() {}

  routes: Object[] = [
    { icon: "home", path: "/home/dashboard", name: "Inicio" },
    { icon: "work", path: "/loan/loan-list", name: "Préstamos" },
    { icon: "people_alt", path: "/client/client-list", name: "Clientes" },
    { icon: "local_atm", path: "/payment/payment-list", name: "Pagos" },
    { icon: "description", path: "/notes", name: "Notas" },
  ];

  navigateTo(route: String, routeRoot: String) {
    this.router.navigate([route]);
    this.toggleNavigate.emit(true);
    this.toolBarTitle.emit(routeRoot);
  }
}
