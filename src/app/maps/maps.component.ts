import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PositionRegister } from 'app/services/positions/position.model';
import { PositionService } from 'app/services/positions/positions.service';
import * as L from 'leaflet'


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnDestroy {
  map;
  private sub: any;
  lastPositions: PositionRegister[] = [];
  codeShoingHistory: string;
  historyMarkers: any;

  constructor(protected positionService: PositionService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      if (params === undefined) { return; }
      console.log(this.map);
      if (this.map === undefined || this.map === null) {
        this.initMap();
      }

      if (params.get('latitude') === undefined || params.get('longitude') === undefined || params.get('latitude') === null || params.get('longitude') === null) { return; }
      const lat = +params.get('latitude');
      const lon = +params.get('longitude');


      const ll = L.latLng(lat, lon);
      this.map.panTo(ll, {animate: true})
    });
    this.positionService.getAll().subscribe(data => {
      this.lastPositions = data.body;
      for (const reg of this.lastPositions ) {
        const marker = L.marker([reg.latitude, reg.longitude]).setIcon(
          L.icon({ iconSize: [15, 20], iconUrl: 'assets/img/maps/marker-icon.png'})).bindTooltip('<b>' + reg.name + '</b><br>' +
          this.datePipe.transform(reg.date, 'dd-MM-yyyy hh:mm:ss'), { permanent: true, direction: 'top', offset: L.point(0, -10)});
        marker.addTo(this.map).openPopup().on('click', () => {this.showHistory(reg.code); });
      }
      }, error => {
        console.log('Error:' + error);

    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private initMap(): void {
    if (this.map !== undefined) { return; }
    this.map = L.map('map', {
        center: [ -32, -71 ],
        zoom: 12
      });
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
  }

  showHistory(code: string) {
    const hide = this.codeShoingHistory !== undefined && code === this.codeShoingHistory;
    if (hide) {
      for (const marker of this.historyMarkers) {
        this.map.removeLayer(marker);
      }
      this.historyMarkers = undefined;
      this.codeShoingHistory = undefined;
      return;
    }
    this.codeShoingHistory = code;
    this.positionService.find(code).subscribe(data => {
      const detailPositions = data.body;
      this.historyMarkers = [];
      const points = [];
      for (const reg of detailPositions) {
        const marker = L.marker([reg.latitude, reg.longitude]).setIcon(
          L.icon({ iconSize: [15, 20], iconUrl: 'assets/img/maps/marker-icon.png'})).on('click', () => {this.showHistory(reg.code); }).bindTooltip('<b>' + reg.name + '</b><br>' +
          this.datePipe.transform(reg.date, 'dd-MM-yyyy hh:mm:ss'), { permanent: false, direction: 'top', offset: L.point(0, -10)});
        this.map.addLayer(marker);
        this.historyMarkers.push(marker);
        points.push([reg.latitude, reg.longitude]);
      }
      const line = L.polyline(points, {color:'red'});
      this.map.addLayer(line);
      this.historyMarkers.push(line);

    }, error => {})
  }
}
