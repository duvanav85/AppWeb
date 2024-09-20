import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeFilter } from '../../../Interfaces/empoyee-interface'
import { FormBuilder, FormGroup } from '@angular/forms';
//import { MatDialog } from '@an';

@Component({
  selector: 'app-modal-search-employee-component',
  standalone: true,
  imports: [],
  templateUrl: './modal-search-employee-component.component.html',
  styles: ``
})
export class ModalSearchEmployeeComponentComponent {
  @Output() setDataFiltro = new EventEmitter<EmployeeFilter>();
  @Output() downloadRequested = new EventEmitter<void>();

  filterPagination: EmployeeFilter = {};
  
  myForm: FormGroup = this._formBuilder.group({
    Identifiucacion: [null],
    Nombre: [null],
    Posicion: [null],
    descripcion: [null],
    estado: [null]
  });
  
  constructor(private _formBuilder: FormBuilder) { }

  downloadData(): void {
    this.downloadRequested.emit();
  }
}
