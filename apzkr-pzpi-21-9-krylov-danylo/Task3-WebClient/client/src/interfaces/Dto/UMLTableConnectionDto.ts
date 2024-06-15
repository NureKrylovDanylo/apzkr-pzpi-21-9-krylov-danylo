import { UMLConnectionType } from "../../types/UMLConnectionType";
import { UMLTableDto } from "./UMLTableDto";

export interface UMLTableConnectionDto {
    tableConnectionId: string,
    leftTableId: string,
    rightTableId: string,
    foreignKeyName: string,
    connectionType: UMLConnectionType
}