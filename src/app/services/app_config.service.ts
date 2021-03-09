import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "protractor";

@Injectable({
    providedIn: 'root'
  })
  export class ConfigService {
    config: Config;
  
    constructor(private http: HttpClient) {}
  
    loadConfig() {
      return this.http
        .get<Config>('assets/config/config.json')
        .toPromise()
        .then(config => {
          this.config = config;
        });
    }

    getHost(): string {
      const host: string = this.config.apiServer.host;
      return host;
    }
  }