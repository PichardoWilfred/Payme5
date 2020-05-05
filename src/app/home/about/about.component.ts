import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  imgSrc1 = require('../../../assets/imagenes/payme_moneda.png');
  imgSrc2 = require('../../../assets/imagenes/payme_letra.png');
  imgSrc3 = require('../../../assets/imagenes/foto_prestamo.png');

  constructor() { }

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }



}
