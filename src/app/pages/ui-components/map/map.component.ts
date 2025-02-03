import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('lat') latInput!: ElementRef;
  @ViewChild('lng') lngInput!: ElementRef;

  private map!: google.maps.Map;
  private marker: google.maps.Marker | null = null;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyDR5pFUA_XF38tV7F2V1FPUL2UfS4fvdpc'
    });

    loader.load().then(() => {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          center: { lat: 13.746085, lng: 100.562153 },
          zoom: 15,
          styles: [],
          streetViewControl: false,
        });
      }
    });
  }

  toklung() {
    const lat = parseFloat(this.latInput.nativeElement.value);
    const lng = parseFloat(this.lngInput.nativeElement.value);


    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 10,
        fillColor: "#FF0000",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#FFFFFF"
      }
    });
      
    if (this.marker) {
      this.marker.setMap(null);
    }

    const position = "หิว";
    const infoWindow = new google.maps.InfoWindow();
    this.marker.addListener("click", () => {
      infoWindow.setContent(position);
      infoWindow.open(this.map, this.marker);
    });

    this.map.setCenter({ lat, lng });
    this.map.setZoom(5);
  }
}
