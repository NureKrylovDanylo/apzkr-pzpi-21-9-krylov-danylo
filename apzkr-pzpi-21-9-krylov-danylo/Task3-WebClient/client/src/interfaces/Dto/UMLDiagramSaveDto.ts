import { UMLTableConnectionDto } from "./UMLTableConnectionDto";
import { UMLTableDto } from "./UMLTableDto";

export interface UMLDiagramSaveDto {
    diagramId: string,
    name: string,
    tables: UMLTableDto[],
    connections: UMLTableConnectionDto[]
}