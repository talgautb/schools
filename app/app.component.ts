import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { Router, Event, NavigationEnd } from '@angular/router';

declare var ga: Function;

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})

export class AppComponent {
  private currentRoute: any;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location) {
    // set site languages
    translate.addLangs(['qq', 'ru', 'en']);
    // default language
    translate.setDefaultLang('ru');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru|qq/) ? browserLang : 'ru');

    // Send pageview to google analytics
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd && window.location.hostname !== 'localhost') {
        let newRoute = this.location.path() || '/';
        if (this.currentRoute !== newRoute) {
          ga('send', 'pageview', newRoute);
          this.currentRoute = newRoute;
        }
      }
    });
  }
}
