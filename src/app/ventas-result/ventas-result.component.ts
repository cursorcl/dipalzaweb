import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ISalesModel } from 'app/services/sales/sale.model'
import { SalesService } from 'app/services/sales/sales.service'

import { OtherServices } from 'app/services/others/other-services'
import { ISellerModel } from 'app/services/others/seller.model'
import { ConfigService } from 'app/services/app_config.service'
import { SseService } from 'app/services/sse/sse.service'
import {
  INFO,
  BILL,
  ERROR,
  FINISH,
  INIT,
  MISSING,
  PROGRESS,
} from '../services/sse/sse.message.model'


import { ResultService } from 'app/services/result/result.service'
import { IResultModel } from '../services/result/result.model';

@Component({
  selector: 'app-ventas-result-list',
  templateUrl: './ventas-result.component.html',
  styleUrls: ['./ventas-result.component.css'],
})
export class VentasResultComponent implements OnInit, OnDestroy {
  sales: ISalesModel[] = []
  seleccionado: ISellerModel
  sellers: ISellerModel[] = []
  dataSource: ISalesModel[]
  showing = false
  enabled = false
  host = 'http://localhost:7000'
  eventSalesUrl = '/streamventa'
  messages: Map<string, IResultModel[]>
  today: Date;

  public icons: Map<string, string>

  constructor(
    protected salesService: SalesService,
    protected otherService: OtherServices,
    protected resultService: ResultService,

    private route: Router,
    private configService: ConfigService,
    private sseService: SseService
  ) {
    if (configService.getHost()) {
      this.host = configService.getHost()
    }
    this.eventSalesUrl = this.host + this.eventSalesUrl
    this.messages = new Map<string, IResultModel[]>()

    this.icons = new Map<string, string>()
    this.icons.set(INFO, 'fa fa-info')
    this.icons.set(ERROR, 'fa fa-close')
    this.icons.set(PROGRESS, 'fa fa-spinner')
    this.icons.set(BILL, 'fa fa-dollar')
    this.icons.set(INIT, 'fa fa-circle')
    this.icons.set(FINISH, 'fa fa-ban')
    this.icons.set(MISSING, 'fa fa-bomb')
  }
  ngOnDestroy(): void {
    if (this.sseService === undefined) {
      return
    }
    this.sseService.close()
  }

  ngOnInit() {
    this.today = new Date();
    this.obtainLogs();

    this.sseService.getServerSentEvent(this.eventSalesUrl).subscribe((data) => {
      console.log(data)
      if (!this.messages.has(data.code)) {
        this.messages.set(data.code, [])
      }
      const codeMessages = this.messages.get(data.code)
      codeMessages.push(data)
      this.messages.set(data.code, codeMessages)
    })

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
    this.obtainLogs();
  }

  obtainLogs() {
    this.messages = new Map<string, IResultModel[]>()

    this.resultService.getByDate(this.today).subscribe((list_data) => {
      const msgs: IResultModel[] = list_data.body;
        for (const data of msgs) {
          if (!this.messages.has(data.vendedor)) {
            this.messages.set(data.vendedor, []);
          }
          const codeMessages = this.messages.get(data.vendedor);
          codeMessages.push(data);
          this.messages.set(data.vendedor, codeMessages);
        }
      });
  }
}
