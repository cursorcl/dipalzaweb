import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IDetailSaleModel } from 'app/services/sales/detail.sale.model';
import { ISalesModel } from 'app/services/sales/sale.model';
import { SalesService } from 'app/services/sales/sales.service';

import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {

  sales: ISalesModel[] = [];



  dataSource: ISalesModel[];

  detailSales: IDetailSaleModel[] = [];
  
  showing = false;
  saleDetail: string
  detailName: string;


  constructor(protected salesService: SalesService, private route: Router) { }

  ngOnInit() {
    this.salesService.getAll().subscribe(data => {
      this.sales = data.body;
      this.dataSource = this.sales;
    }, error => {
    })
  }

  gotoMap(latitude: number, longitude: number)
  {
      this.route.navigate(['/mapa',  latitude, longitude]);
  }
  detail(codigo_vendedor: string, rut: string, codigo: string, fecha: string, nombre_cliente: string) {
    this.detailName = nombre_cliente;
    this.salesService.find(codigo_vendedor, rut, codigo, fecha).subscribe(data => {
      this.detailSales = data.body;
      
      this.showing = true;
    }, error => {})
  }

  setShowing(value) {
    this.showing = value;
  }

}
