import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ISalesModel } from 'app/services/sales/sale.model'
import { SalesService } from 'app/services/sales/sales.service'

import { OtherServices } from 'app/services/others/other-services'
import { ISellerModel } from 'app/services/others/seller.model'
import { ConfigService } from 'app/services/app_config.service'


@Component({
  selector: 'app-ventas-summary-list',
  templateUrl: './ventas-summary.component.html',
  styleUrls: ['./ventas-summary.component.css'],
})
export class VentasSummaryComponent implements OnInit, OnDestroy {
  sales: ISalesModel[] = []
  seleccionado: ISellerModel
  sellers: ISellerModel[] = []
  dataSource: ISalesModel[]
  showing = false
  enabled = false
  host = 'http://localhost:7000'
  eventSalesUrl = '/streamventa'
  public icons: Map<string, string>

  constructor(
    protected salesService: SalesService,
    protected otherService: OtherServices,
    private route: Router,
    private configService: ConfigService,
    private router: Router
  ) {
    if (configService.getHost()) {
      this.host = configService.getHost()
    }
    this.eventSalesUrl = this.host + this.eventSalesUrl
  }
  ngOnDestroy(): void {}

  ngOnInit() {
    this.salesService.getAll().subscribe(
      (data) => {
        this.sales = data.body
        this.dataSource = this.sales
      },
      (error) => {}
    )

    this.otherService.getSellers().subscribe(
      (data) => {
        this.sellers = data.body
      },
      (error) => {}
    )
  }

  onSelect(seller) {
    this.enabled = false
    if (seller === 'TODOS') {
      this.salesService.getAll().subscribe(
        (data) => {
          this.sales = data.body
          this.dataSource = this.sales
        },
        (error) => {}
      )
      this.seleccionado = undefined
      return
    }
    this.salesService.findSale(seller.codigo).subscribe(
      (data) => {
        this.seleccionado = seller
        this.sales = data.body
        this.dataSource = this.sales
        this.enabled = true
      },
      (error) => {}
    )
  }

  onProcess() {
    if (this.seleccionado === undefined) {
      return
    }

    this.salesService.confirmSale(this.seleccionado.codigo).subscribe(
      (data) => {
        const resut = data.body
        console.log('Finalizado el procesamiento de ventas')
        this.router.navigateByUrl('/ventas-result');

      },
      (error) => {}
    )
  }
}
