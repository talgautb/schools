import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

import { School } from './school';

@Injectable()
export class SchoolService {
  private schoolsUrl = 'assets/data/schools.json';
  private citiesUrl = 'assets/data/cities.json';

  constructor(private http: Http) {}

  public getSchools() {
    return this.http.get(this.schoolsUrl)
      .toPromise()
      .then((school) => school.json());
  }

  /**
   * get school by id
   * @param {String|Number} id number of school or code of school
   */
  public getSchool(id: any) {
    return this.getSchools()
      .then((schools) => schools.find((school: School) => school.id === id));
  }

  public getRegions() {
    return this.http.get(this.citiesUrl)
      .toPromise()
      .then((cities) => cities.json());
  }
  /**
   * Get city or regions
   * @param {Number} id codes license plates of Kazakhstan regions
   */
  public getRegion(id: any) {
    return this.getRegions()
      .then((cities) => cities.find((city: any) => city.id === id));
  }
}
