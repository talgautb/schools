import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="about">
      <h2>{{ title }}</h2>
      <div [innerHTML]="text"></div>
    </div>
  `,
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  public title = 'Информация';
  public text = `
    <p>Информация по результатом ЕНТ доступна на сайте
    <a href="http://edualmaty.kz" target="_blank">Управления образования г.Алматы</a>.
    <p>Рейтинг школ составлен по результатам среднего балла ЕНТ (2016 год).
    <p>Если у вас есть идеи и предложения по сайту, напишите мне gtalk.kz [] gmail.com
  `;
}
