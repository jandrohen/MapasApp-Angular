import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `.mapa-container{
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [-2.4574804196745426, 42.464012977763495];

  constructor() {}

  //Usamos el ngAfterViewInit porque la referencia que cogemos del DOM con el ViewChild
  //no se llega a cargar en el ngOnInit por lo tanto nos dara undefined este elemento
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // Marcardor personalizado que funciona insertándolo en una de las propiedades del Marker//
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola mundo';

    new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa);
  }

}
