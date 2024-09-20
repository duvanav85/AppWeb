import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from './Interfaces/empoyee-interface';
import { Observable } from 'rxjs';
import { AlertService } from '../../shared/services/alert/alert.service';
//Interfaces
import { ApiResponse, CustomPagedResponse } from '../../core/models/dto/apiresponse.interface';
import { TableEmployeeComponentesComponent } from "./components/table-employee/table-employee-componentes/table-employee-componentes.component";
import {EmployeeFilter} from '../profile/Interfaces/empoyee-interface';
import { ModalSearchEmployeeComponentComponent } from './components/modal-search-employee/modal-search-employee-component/modal-search-employee-component.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, ModalSearchEmployeeComponentComponent, TableEmployeeComponentesComponent],
  templateUrl: './profile.component.html'
})
export default class ProfileComponent  implements OnInit{
  employee?    :   Observable<CustomPagedResponse<IEmployee>>;
  employeeFilter : EmployeeFilter = { pageNumber: 1, pageSize: 5 }
  employeeTotal  : EmployeeFilter = { pageNumber: 1, pageSize: 4444 }

  constructor(private employeeService : EmployeeService, 
              private alertService   : AlertService){}

  ngOnInit(): void {
    this.getEmployee();
  }

  getprofileDownload(): void{

  }

  addPagination(event: EmployeeFilter): void {
    this.employeeFilter.pageNumber = event.pageNumber
    this.employeeFilter.pageSize   = event.pageSize
    this.getEmployee()
  }

  addFilter(event: EmployeeFilter): void {
    this.employeeFilter.identificicacion    = event.identificicacion
    this.employeeFilter.nombre              = event.nombre
    this.employeeFilter.posicion            = event.posicion
    this.employeeFilter.descripcion         = event.descripcion
    this.employeeFilter.estado              =  event.estado
    this.employeeFilter.pageNumber          = event.pageNumber
    this.employeeFilter.pageSize            = event.pageSize
    this.getEmployee()
  }

  getEmployee(): void {
    this.employeeService.getAllemployee(this.employeeFilter).subscribe({
      next: response => {
        if (!response.succeeded) {
          this.alertService.messageAlert({ message: "Por favor intente más tarde." });
        } else {
          this.employeeService.updateemployeeObservable(response)
        }
      },error: (err: any) => this.alertService.messageAlert({ message: "Por favor intente más tarde." })
    });
  }
}
