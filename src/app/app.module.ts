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
import { AppRoutingModule }     from './app-routing.module';

import { ChartModule } from 'angular2-highcharts';
import { FilterByGos } from './dashboard/gos.pipe';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
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
