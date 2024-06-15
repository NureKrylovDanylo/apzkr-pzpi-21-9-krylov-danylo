import { IDimension } from "../IDimension";
import { IPosition } from "../IPosition";
import { UMLTableColumn } from "./UMLTableColumn";

export interface UMLTable {
    tableId: string,
    name: string,
    columns: UMLTableColumn[],
    position: IPosition,
    dimensions: IDimension,
  }