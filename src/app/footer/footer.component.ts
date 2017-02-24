import { Component } from '@angular/core';

@Component({
  selector: 'footer-component',
  // TODO: component
  template: `
    <div class="copyright">made by <a href="http://gtalk.kz">talgautb</a> © 2016</div>
  `,
  styles: [`
    .copyright {
      font-size: 14px;
      margin: 15px 0;
      font-family: "Roboto", Arial, sans-serif;
    }
  `]
})

export class FooterComponent {}
