import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  
  url: string = "http://localhost:4000/public/dashboard/0fd0196d-24b9-45f8-8ee0-aa2dad6c59ee";
  urlSafe: SafeResourceUrl;


  constructor( private route: Router, public sanitizer: DomSanitizer) { 
    this.urlSafe = sanitizer.bypassSecurityTrustUrl(this.url);
  }

  ngOnInit() {
    
  }

}
