import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, Http }    from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { AboutComponent }      from './about/about.component';
import { SchoolComponent } from './school/school.component';
import { FooterComponent } from './footer/footer.component';

import { SchoolService }      from './school/school.service';
import { ROUTES } from './app.routes';
// import { AppRoutingModule }     from './app-routing.module';

import { ChartModule } from 'angular2-highcharts';
import { FilterByGos } from './dashboard/gos.pipe';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts')),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
      }
    }),
    RouterModule.forRoot(ROUTES)
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
