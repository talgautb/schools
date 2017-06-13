import { Component, OnInit } from '@angular/core';

import { School } from '../school/school';
import { SchoolService } from '../school/school.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})

export class DashboardComponent implements OnInit {
  public schools: School[];
  public bestOf: School[];
  public allSchools: number = 0;
  public entOfCity: any = 0;
  public failedPeople: number = 0;
  public schoolType: string;
  public showFilter: Boolean = false;
  public searchBox: string;

constructor(private schoolService: SchoolService) {
    this.searchBox = '';
  }

  // here we go
  public ngOnInit(): void {
    this.getSchools();
  }

  public resetFilter(): void {
    this.schoolType = '';
    this.searchBox = '';
  }

  private getSchools(): void {
    this.schoolService.getSchools()
      .then((school: any) => {
        let arr = school;

        arr.sort((a: any, b: any) => {
          return b.ent_result_2016 - a.ent_result_2016;
        });

        this.schools = arr;
        this.createAdditionalData();
      });
  }

  /**
   * create info about city on main page
   */
  private createAdditionalData(): void {
    if (this.schools.length) {
      let numb = 0;
      let fail = 0;

      this.allSchools = this.schools.length;

      this.schools.forEach((item) => {
        numb = numb + item.ent_result_2016;
        fail = fail + item.ent_failed;
      });

      // additional data
      this.failedPeople = fail;
      this.entOfCity = (numb / this.schools.length).toFixed(2);
    }
  }
}
