import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface MarcadorColor {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `.mapa-container{
      width: 100%;
      height: 100%;
    }
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [-2.4574804196745426, 42.464012977763495];

  //Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

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

    // new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }
  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat( this.center )
      .addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    } );
  }

  irMarcador(){
    // this.mapa.flyTo()
  }
}
