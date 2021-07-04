import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IDetailSaleModel } from './detail.sale.model';
import { ISalesModel } from './sale.model';
import { ConfigService } from '../app_config.service';
import { ISellerCodeModel, SellerCodeModel } from './codigo.sale.model';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SalesService {
    public resourceSalesUrl = 'http://localhost:7000/listsales'
    public resourceSalesOfSaleUrl = 'http://localhost:7000/listsales/sale'
    public resourceSaleUrl = 'http://localhost:7000/listonesale'
    public resourceRegisterSales = 'http://localhost:7000/registersale'
    
    private host = 'http://localshot:7000';

    constructor(protected http: HttpClient, configService: ConfigService) {

        if(configService.getHost())
        {
            this.host = configService.getHost();
        }
        this.resourceSalesUrl = this.host + '/listsales';
        this.resourceSaleUrl = this.host + '/listonesale';
        this.resourceSalesOfSaleUrl = this.host + '/listsales/sale';
        this.resourceRegisterSales = this.host + '/registersale';
    }

    getAll(): Observable<HttpResponse<ISalesModel[]>>
    {
        return this.http.get<ISalesModel[]>(this.resourceSalesUrl , { observe: 'response' });
    }

    findSale(codigo_vendedor: string): Observable<HttpResponse<ISalesModel[]>>
    {
        return this.http.get<ISalesModel[]>(`${this.resourceSalesOfSaleUrl}/${codigo_vendedor}` , { observe: 'response' });
    }

    find(codigo_vendedor: string, rut: string, codigo: string, fecha: string): Observable<HttpResponse<IDetailSaleModel[]>>
    {
        return this.http.get<IDetailSaleModel[]>(`${this.resourceSaleUrl}/${codigo_vendedor}/${rut}/${codigo}/${fecha}` , { observe: 'response' });
    }

    confirmSale(codigo_vendedor: string): Observable<HttpResponse<ISellerCodeModel>>
    {
        const sellerCode: ISellerCodeModel =  new SellerCodeModel(codigo_vendedor);
        return this.http.post<ISellerCodeModel>(this.resourceRegisterSales, sellerCode, { observe: 'response' });
    }



}