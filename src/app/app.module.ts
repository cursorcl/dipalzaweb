import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MapModule } from './maps/map.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConfigService } from './services/app_config.service';



export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MapModule,
    RouterModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatTableModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
    

  ],
  providers: [DatePipe, 
    { provide: Window, useValue: window },
  {
    provide: APP_INITIALIZER,
    useFactory: configFactory,
    deps: [ConfigService],
    multi: true
  }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
