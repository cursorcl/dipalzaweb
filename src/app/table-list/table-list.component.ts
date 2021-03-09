import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionRegister } from 'app/services/positions/position.model';
import { PositionService } from 'app/services/positions/positions.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  lastPositions: PositionRegister[] = [];
  detailPositions: PositionRegister[] = [];
  showing = false;
  saleDetail: string
  constructor(protected positionService: PositionService, private route: Router) { }

  ngOnInit() {
    this.positionService.getAll().subscribe(data => {
      this.lastPositions = data.body;
    }, error => {
      for(let i=1; i<=10; i++)
      {
        this.lastPositions.push(new PositionRegister("002", "10.812.497-0", "CRISTINA PAVEZ GALVEZ",  new Date(),  -33.30 + i, -73.30 + i, "32º00'00''[S] 071º00'00''[W]", 45 - i))
      }
  
    })
  }

  gotoMap(latitude: number, longitude: number)
  {
      this.route.navigate(['/mapa',  latitude, longitude]);
  }
  detail(code: string, name: string) {

    this.saleDetail = name;
    this.positionService.find(code).subscribe(data => {
      this.detailPositions = data.body;
      this.showing = true;
    }, error => {})

  }

  setShowing(value) {
    this.showing = value;
  }
}
