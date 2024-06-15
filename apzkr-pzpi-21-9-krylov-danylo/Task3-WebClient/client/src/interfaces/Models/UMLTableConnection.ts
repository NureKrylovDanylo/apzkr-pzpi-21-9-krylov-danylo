import { UMLConnectionType } from "../../types/UMLConnectionType";
import { UMLTable } from "./UMLTable";

export interface UMLTableConnection {
    tableConnectionId: string,
    leftTableId: string,
    leftTable: UMLTable,
    rightTableId: string,
    rightTable: UMLTable,
    foreignKeyName: string,
    connectionType: UMLConnectionType,
  }