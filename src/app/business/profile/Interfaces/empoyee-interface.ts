import { PaginationFilter } from "../../../core/models/dto/apiresponse.interface";

export interface IEmployee{
    identificicacion?    :    number;
    nombre?              :    string;
    posicion?            :    number;
    descripcion?         :    string;
    estado               :    boolean;   
}

export interface EmployeeFilter extends PaginationFilter {
    identificicacion? : number;
    nombre?           : string; 
    posicion?         : number;
    descripcion?      : string;
    estado?           : string;  //"all", "true", "false"
}
  