import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
//Interfaces
import { IEmployee, EmployeeFilter } from '../../../Interfaces/empoyee-interface';
import { CustomPagedResponse } from '../../../../../core/models/dto/apiresponse.interface';
import { TABLE_PAGINATOR } from '../../../../../shared/constants/table-paginator';
import { ModalEmployeeComponentComponent } from '../../modal-employee/modal-employee-component/modal-employee-component.component';
import { Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-table-employee-componentes',
  standalone: true,
  imports: [DialogModule, CdkTableModule, FormsModule],
  templateUrl: './table-employee-componentes.component.html',
  styles: ``
})

export class TableEmployeeComponentesComponent {
  @Input() dataSource :CustomPagedResponse<IEmployee>={};
  @Output() sendDataPagination = new EventEmitter<EmployeeFilter>();

  displayedColumns  : string[] = ['Identificacion', 'Nombres', 'Posicion', 'Descripcion', 'Estado'];
  filterPagination  : EmployeeFilter={};

  opPag = { ...TABLE_PAGINATOR };
  

  pageChanged(event: any): void {
    this.filterPagination.pageNumber=event.pageIndex+1
    this.filterPagination.pageSize=event.pageSize
    this.sendDataPagination.emit(this.filterPagination)
  }
  
  dialog = inject(Dialog)
  
  editEmployee(employee: IEmployee): void {
    const dialogRef = this.dialog.open(ModalEmployeeComponentComponent, {
      width: '70%',
      maxHeight: '80vh',
      disableClose: true,
      data: { editMode: true,employee }
    });
    dialogRef.closed.subscribe(result => {});
  } 
}
