import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

import { School } from './school';

@Injectable()
export class SchoolService {

  private schoolsUrl = 'app/schools.json';
  private citiesUrl = 'app/cities.json';

  constructor(private http: Http) {}

  getSchools() {
    return this.http.get(this.schoolsUrl)
      .toPromise()
      .then(school => school.json());
  }

  /**
   * get school by id
   * @param {String|Number} id number of school or code of school
   */
  getSchool(id: any) {
    return this.getSchools()
      .then(schools => schools.find((school: School) => school.id === id));
  }

  getRegions() {
    return this.http.get(this.citiesUrl)
      .toPromise()
      .then(cities => cities.json());
  }
  /**
   * Get city or regions
   * @param {Number} id codes license plates of Kazakhstan regions
   */
  getRegion(id: any) {
    return this.getRegions()
      .then(cities => cities.find((city: any) => city.id === id));
  }
}
