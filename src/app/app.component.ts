import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router, Event, NavigationEnd } from '@angular/router';

declare var ga: Function;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private currentRoute: any;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private location: Location) {
    // set site languages
    translate.addLangs(['qq', 'ru', 'en']);
    // default language
    translate.setDefaultLang('ru');

    let browserLang = translate.getBrowserLang();
    let savedLang = localStorage.getItem('lang');
    if (browserLang === 'kk') {
      browserLang = 'qq'; // hack
    }
    let lang = (savedLang) ? savedLang : browserLang.match(/en|ru|qq/) ? browserLang : 'ru';
    this.setLang(lang);

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

  /**
   * Change site language and save it to localStorage
   *
   * @param {string} lang
   *
   * @memberof AppComponent
   */
  public setLang(lang: string) {
    if (lang !== this.translate.currentLang) {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
    }
  }
}
