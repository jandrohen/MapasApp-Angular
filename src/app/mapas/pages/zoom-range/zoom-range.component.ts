import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height: 100%;
      }
      .row{
        background-color:white;
        border-radius:5px;
        bottom: 50px;
        left: 50px;
        padding:10px;

        position:fixed;
        z-index:999;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit  {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;

  constructor() {}

  //Usamos el ngAfterViewInit porque la referencia que cogemos del DOM con el ViewChild
  //no se llega a cargar en el ngOnInit por lo tanto nos dara undefined este elemento
  ngAfterViewInit() : void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-2.4574804196745426,42.464012977763495],
      zoom: this.zoomLevel
    });
  }

  zoomOut(): void {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(): void {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

}
