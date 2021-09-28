import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
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
        width: 25rem;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number,number] = [-2.4574804196745426,42.464012977763495];

  constructor() {}

  ngOnDestroy(): void {
    // Destruimos los listener ya que podrían quedarse activos
    this.mapa.off('zoom', () => {} )
    this.mapa.off('zoomend', () => {} )
    this.mapa.off('move', () => {} )
  }

  //Usamos el ngAfterViewInit porque la referencia que cogemos del DOM con el ViewChild
  //no se llega a cargar en el ngOnInit por lo tanto nos dara undefined este elemento
  ngAfterViewInit() : void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //Escuchamos el evento zoom de la librería y le asignamos el valor a nuestra variable zoomLevel
    this.mapa.on('zoom', () => this.zoomLevel = this.mapa.getZoom());

    //Limitación final del zoom al valor 19 de zoom
    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 19){
        this.mapa.zoomTo(19);
      }
    });

    //Movimiento del mapa (Latitud y Longitud)
    this.mapa.on('move', (event) =>{
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng , lat ];
    });

  }

  zoomOut(): void {
    this.mapa.zoomOut();
  }

  zoomIn(): void {
    this.mapa.zoomIn();
  }

  zoomCambio(value: string): void {
    this.mapa.zoomTo(Number(value))
  }

}
