import { IDimension } from "../IDimension";
import { IPosition } from "../IPosition";
import { UMLTableColumnDto } from "./UMLTableColumnDto";

export interface UMLTableDto {
    name: string,
    position: IPosition,
    columns: UMLTableColumnDto[]
}