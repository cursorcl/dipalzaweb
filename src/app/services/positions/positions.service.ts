import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPositionRegister } from './position.model';
import { ConfigService } from '../app_config.service';


@Injectable({ providedIn: 'root' })
export class PositionService {
    public resourcePositionsUrl = "http://localhost:7000/positions";
    public resourceLastPositionsUrl = "http://localhost:7000/lastpositions";

    private host = "http://localshot:7000";

    constructor(protected http: HttpClient, configService: ConfigService) {

        if(configService.getHost())
        {
            this.host = configService.getHost();
        }
        this.resourcePositionsUrl = this.host + "/positions";
        this.resourceLastPositionsUrl = this.host + "/lastpositions";
    }

    getAll(): Observable<HttpResponse<IPositionRegister[]>>
    {
        return this.http.get<IPositionRegister[]>(this.resourceLastPositionsUrl , { observe: 'response' });
    }

    find(vendedor: string): Observable<HttpResponse<IPositionRegister[]>>
    {
        return this.http.get<IPositionRegister[]>(`${this.resourcePositionsUrl}/${vendedor}` , { observe: 'response' });
    }
}