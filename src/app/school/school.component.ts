import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { SchoolService } from './school.service';
import { School, City, Info } from './school';

@Component({
  selector: 'my-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})

export class SchoolComponent implements OnInit {
  public school: School;
  public id: any;
  public info: Info;
  public city: City;
  public options: Object;
  public optionscompare: Object;
  public optionschart: Object;
  // default Almaty
  private cityId: number = 2;

  constructor(
    private router: ActivatedRoute,
    private schoolService: SchoolService) {
    this.info = {
      site: '',
      percent: ''
    };
  }

  public ngOnInit() {
    this.router.params.forEach((params: Params) => {
      this.id = params['id'];
      this.getRegion();
    });
  }

  private getRegion(): void {
    this.schoolService.getRegion(this.cityId)
      .then((city: City) => {
        this.city = city;
        // get school data
        this.getSchool();
      });
  }

  private getSchool(): void {
    this.schoolService.getSchool(this.id)
      .then((school: School) => {
        this.school = school;
        if (!this.school.site) {
          this.school.site = '';
        }
        this.getInfo();
      });
  }

  private getInfo() {
    // sites like 19.alschool.kz
    this.info.site = `http://${+this.id}.alschool.kz`;

    if (this.info.site.indexOf('NaN') !== -1) {
      this.info.site = '';
    }

    if (this.city.hasOwnProperty('name') && this.school) {
      this.info.percent = (this.school.graduates_ent * 100 / this.school.graduates_all).toFixed(2);

      /**
       * Common chart of UNT, 2014--2016 years
       * @type {Object}
       */
      this.options = {
        chart: {
          type: 'areaspline'
        },
        title : { text : 'Динамика сдачи ЕНТ а 2014-2016 гг.' },
        yAxis: {
          title: {
            text: ''
          }
        },
        plotOptions: {
              areaspline: {
                  fillOpacity: 0.5
              }
          },
        xAxis: {
          categories: [2014, 2015, 2016]
        },
        series: [{
          name: 'средний балл школы',
          data: [
            this.school.ent_result_2014,
            this.school.ent_result_2015,
            this.school.ent_result_2016
          ],
        }, {
          name: 'Средний балл города',
          data: [
            this.city.ent_result_2014,
            this.city.ent_result_2015,
            this.city.ent_result_2016
          ],
        }]
      };

      let sc = this.school;
      let ct = this.city;

      /**
       * Compare school's results with city's results
       * @type {Object}
       */
      this.optionscompare = {
        chart: {
           type: 'column'
        },
        title: {
           text: ' '
        },
        xAxis: {
          categories: [
            '0-3',
            '3-50',
            '50-70',
            '70-101',
            '101-125'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: '%'
          }
        },
        tooltip: {
          headerFormat: '<table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          }
        },
        series: [{
          name: sc.name,
          data: [
            sc.ent_failed_0_3 * 100 / sc.graduates_ent,
            (sc.ent_failed - sc.ent_failed_0_3) * 100 / sc.graduates_ent,
            (sc.graduates_ent - sc.ent_failed - sc.ent_succes_70_125) * 100 / sc.graduates_ent,
            (sc.ent_succes_70_125 - sc.ent_succes_101_125) * 100 / sc.graduates_ent,
            (sc.ent_succes_101_125 * 100) / sc.graduates_ent
          ]
        }, {
          name: ct.name,
          data: [
            ct.ent_failed_0_3 * 100 / ct.graduates_ent,
            (ct.ent_failed - ct.ent_failed_0_3) * 100 / ct.graduates_ent,
            (ct.graduates_ent - ct.ent_failed - ct.ent_succes_70_125) * 100 / ct.graduates_ent,
            (ct.ent_succes_70_125 - ct.ent_succes_101_125) * 100 / ct.graduates_ent,
            (ct.ent_succes_101_125 * 100) / ct.graduates_ent
          ]
        }]
      };

      /**
       * School's UNT 2016
       * @type {Object}
       */
      this.optionschart = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
           text: 'ЕНТ 2016'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: false
            },
            showInLegend: true
          },
        },
        series: [{
          name: 'Выпускников',
          colorByPoint: true,
          data: [{
            name: '0-3',
            y: sc.ent_failed_0_3
          }, {
            name: '3-50',
            y: sc.ent_failed - sc.ent_failed_0_3
          }, {
            name: '50-70',
            y: sc.graduates_ent - sc.ent_failed - sc.ent_succes_70_125
          }, {
            name: '70-101',
            y: sc.ent_succes_70_125 - sc.ent_succes_101_125
          }, {
            name: '101-125',
            y: sc.ent_succes_101_125
          }]
        }]
      };
    }
  }
}
