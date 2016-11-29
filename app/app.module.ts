import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { AboutComponent }      from './about/about.component';
import { SchoolComponent } from './school/school.component';
import { FooterComponent } from './footer/footer.component';

import { SchoolService }      from './school/school.service';

import { AppRoutingModule }     from './app-routing.module';

import { ChartModule } from 'angular2-highcharts';
import { FilterByGos } from './dashboard/gos.pipe';

import { TranslateModule } from 'ng2-translate';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    ChartModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    SchoolComponent,
    FooterComponent,
    FilterByGos
  ],
  providers: [ SchoolService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
