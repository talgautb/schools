import { Component, OnInit } from '@angular/core';

import { School } from '../school/school';
import { SchoolService } from '../school/school.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})

export class DashboardComponent implements OnInit {

  schools: School[];
  bestOf: School[];
  allSchools: number = 0;
  entOfCity: any = 0;
  failedPeople: number = 0;
  schoolType: string;
  showFilter: Boolean = false;
  searchBox: string;

constructor(private schoolService: SchoolService) {
    this.searchBox = '';
  }

  // here we go
  ngOnInit(): void {
    this.getSchools();
  }

  getSchools(): void {
    this.schoolService.getSchools()
      .then(school => {
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
  createAdditionalData(): void {
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

  resetFilter(): void {
    this.schoolType = '';
    this.searchBox = '';
  }
}
