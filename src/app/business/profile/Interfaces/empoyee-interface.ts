import { PaginationFilter } from "../../../core/models/dto/apiresponse.interface";

export interface IEmployee{
    identificicacion?    :    number;
    nombre?              :    string;
    posicion?            :    number;
    descripcion?         :    string;
    estado               :    boolean;   
}

export interface AccountFilter extends PaginationFilter {
    childDisplayName? : string;
    childEnable?      : string;  //"all", "true", "false"
    childOwnerId?     : string;
    displayName?      : string;
    enable?           : string;  //"all", "true", "false"
    ownerId?          : string;
  }
  