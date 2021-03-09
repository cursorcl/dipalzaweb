import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../app_config.service';
import { IPositionRegister } from '../positions/position.model';
import { ISellerModel } from './seller.model';

@Injectable({ providedIn: 'root' })
export class OtherServices {
    public resourceSellerUrl = 'sellers'
    private host = 'http://localshot:7000';

constructor(protected http: HttpClient, configService: ConfigService) {

        if(configService.getHost())
        {
            this.host = configService.getHost();
        }
    }

    getSellers(): Observable<HttpResponse<ISellerModel[]>>
    {
        return this.http.get<ISellerModel[]>(`${this.host}/${this.resourceSellerUrl}` , { observe: 'response' });
    }

}