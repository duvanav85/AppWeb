import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from './Interfaces/empoyee-interface';
import { Observable, lastValueFrom } from 'rxjs';
//Interfaces
import { ApiResponse, CustomPagedResponse } from '../../core/models/dto/apiresponse.interface';
import { TableEmployeeComponentesComponent } from "./components/table-employee/table-employee-componentes/table-employee-componentes.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, TableEmployeeComponentesComponent],
  templateUrl: './profile.component.html'
})
export default class ProfileComponent  implements OnInit{
  employee?    :   Observable<CustomPagedResponse<IEmployee>>;

  ngOnInit(): void {
    
  }
}
