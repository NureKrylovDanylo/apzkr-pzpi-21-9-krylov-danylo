import { UMLTable } from "./UMLTable";
import { UMLTableConnection } from "./UMLTableConnection";

export interface UMLDiagram {
    diagramId: string,
    name: string,
    creationDate: string,
    tables: UMLTable[],
    connections: UMLTableConnection[],
  }