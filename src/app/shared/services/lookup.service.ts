import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(private baseService: BaseService) {}

  public getListOfParameterValues(): Observable<any> {
    return this.baseService.get(`lookups/get-all-parameter-value`);
  }

  public getListOfCategories(): Observable<any> {
    return this.baseService.get(`lookups/get-all-category`);
  }

  public getListOfUOMs(): Observable<any> {
    return this.baseService.get(`lookups/get-all-uoms`);
  }

  public createParameterValue(data: {
    code: string;
    description: string;
  }): Observable<any> {
    return this.baseService.post(`lookups/create-parameter-value`, data);
  }
}
