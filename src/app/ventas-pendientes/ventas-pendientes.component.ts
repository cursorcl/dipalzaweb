import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js' 


@Component({
  selector: 'app-ventas-pendientes',
  templateUrl: './ventas-pendientes.component.html',
  styleUrls: ['./ventas-pendientes.component.css']
})
export class VentasPendientesComponent implements OnInit{

  KisshtHtml;
  METABASE_SITE_URL = "http://localhost:3000";
  METABASE_SECRET_KEY = "0452c9faad4492b21369c00a56a13778c5a2cca62ddcc8bd9f86a77df84ee47c";

  url: string = "http://localhost:3000/public/dashboard/0fd0196d-24b9-45f8-8ee0-aa2dad6c59ee/";
    //url: string = "http://www.google.cl";
  urlSafe: SafeResourceUrl;

  /*
  constructor(private http:HttpClient, private sanitizer:DomSanitizer) { 
    const payload = {
      resource: { dashboard: 1 },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    }
    const token = this.signToken(payload, this.METABASE_SECRET_KEY);
    const url =  `${this.METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
    this.urlSafe = sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  */

  constructor(private http:HttpClient, private sanitizer:DomSanitizer) { 
    this.urlSafe = sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  ngOnInit(): void {
    /*
    this.http.get(this.url,{responseType:'text'}).subscribe(res => 
      {
        this.KisshtHtml = this.sanitizer.bypassSecurityTrustHtml(res);
      }
    )
    */
  }

  base64url(source: any) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    return encodedSource.replace(/\//g, '_');
  }

  encodeToken(payload:any) {
    const header = {
      "alg": "HS256",
      "typ": "JWT"
    };

    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = this.base64url(stringifiedHeader);

    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    const encodedData = this.base64url(stringifiedData);

    return `${encodedHeader}.${encodedData}`;
  }

  signToken(payload:any,key:string) {
    const secret = key;
    let token:any = this.encodeToken(payload);

    let signature:any = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    const signedToken = `${token}.${signature}`;
    return signedToken;
  }
}
