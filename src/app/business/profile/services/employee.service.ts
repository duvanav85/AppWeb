import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { EmployeeFilter, IEmployee } from '../Interfaces/empoyee-interface';
import { ApiResponse, CustomPagedResponse } from '../../../core/models/dto/apiresponse.interface';

import { BaseService } from '../../../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private urlGetAll = 'employee/get-all'
  private urlCreate = 'employee/create'
  private urlUpdate = 'employee/update'
  
  private employee$ = new BehaviorSubject<CustomPagedResponse<IEmployee>>({});
  readonly employees = this.employee$.asObservable();
  
  constructor(private http: BaseService) { }

  getAllemployee(filters: EmployeeFilter): Observable<CustomPagedResponse<IEmployee>> {
    return this.http.Post(this.urlGetAll, filters);
  }

  updateemployeeObservable(employees: CustomPagedResponse<IEmployee>): void {
    employees.data?.forEach(item => {
      item.nombre = `[${item.nombre}] ${item.nombre}`;
    })
    this.employee$.next(employees);
  }

  updateEmployee(employees:IEmployee): Observable<ApiResponse<boolean>>{
    return this.http.Post(this.urlUpdate, employees);
  }

  creatEmployee(employees:IEmployee): Observable<ApiResponse<boolean>>{
    return this.http.Post(this.urlCreate, employees);
  }
}
