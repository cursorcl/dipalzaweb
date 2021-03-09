import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { ConfigService } from '../app_config.service'
import { catchError, retry } from 'rxjs/operators'
import { ISellerCodeModel, SellerCodeModel } from '../sales/codigo.sale.model'
import { IDetailSaleModel } from '../sales/detail.sale.model'
import { ISalesModel } from '../sales/sale.model'
import { IResultModel } from './result.model'
import { DatePipe } from '@angular/common'

@Injectable({ providedIn: 'root' })
export class ResultService {
  public registerslog = 'http://localhost:7000/registerslog'
  public registerslogvendedor = 'http://localhost:7000/registerslogvendedor'
  public registerslogfecha = 'http://localhost:7000/registerslogfecha'
  public registerslogvendedorfecha = 'http://localhost:7000/registerslogvendedorfecha'

  private host = 'http://localshot:7000'

  constructor(protected http: HttpClient, configService: ConfigService,
    public datepipe: DatePipe) {
    if (configService.getHost()) {
      this.host = configService.getHost()
    }
    this.registerslog = this.host + '/registerslog'
    this.registerslogvendedor = this.host + '/registerslogvendedor'
    this.registerslogfecha = this.host + '/registerslogfecha'
    this.registerslogvendedorfecha = this.host + '/registerslogvendedorfecha'
  }

  getAll(): Observable<HttpResponse<IResultModel[]>> {
    return this.http.get<IResultModel[]>(this.registerslog, {
      observe: 'response',
    })
  }

  getBySale(codigo_vendedor: string): Observable<HttpResponse<IResultModel[]>> {
    return this.http.get<IResultModel[]>(
      `${this.registerslogvendedor}/${codigo_vendedor}`,
      { observe: 'response' }
    )
  }

  getByDate(date: Date): Observable<HttpResponse<IResultModel[]>> {

    const latest_date =this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
    return this.http.get<IResultModel[]>(
      `${this.registerslogfecha}/${latest_date}`,
      { observe: 'response' }
    )
  }

  getBySaleDate(codigo_vendedor: string, date: Date): Observable<HttpResponse<IResultModel[]>> {
    return this.http.get<IResultModel[]>(
      `${this.registerslogfecha}/${codigo_vendedor}/${date}`,
      { observe: 'response' }
    )
  }

}
