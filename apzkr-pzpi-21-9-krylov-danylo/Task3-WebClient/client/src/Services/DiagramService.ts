import uuid from "react-uuid";
import { getUmlDiagram, saveUmlDiagram } from "../http/umlApi";
import { UMLDiagramSaveDto } from "../interfaces/Dto/UMLDiagramSaveDto";
import { UMLTableColumnDto } from "../interfaces/Dto/UMLTableColumnDto";
import { UMLTableConnectionDto } from "../interfaces/Dto/UMLTableConnectionDto";
import { UMLTableDto } from "../interfaces/Dto/UMLTableDto";
import { UMLDiagram } from "../interfaces/Models/UMLDiagram";
import { UMLTable } from "../interfaces/Models/UMLTable";
import { UMLTableColumn } from "../interfaces/Models/UMLTableColumn";

export class DiagramService {
  async get(id: string): Promise<UMLDiagram> {
    try {
      const data = await getUmlDiagram(id);
      const diagram: UMLDiagram = {
        ...data,
        tables: data.tables.map((table: UMLTable) => ({
          ...table,
          tableId: uuid(),
          columns: table.columns.map((column: UMLTableColumn) => ({
            ...column,
            tableColumnId: uuid(),
          })),
        })),
      };

      return diagram;
    } catch (error) {
      throw error;
    }
  }

  async save(diagram: UMLDiagram): Promise<void> {
    try {
      const newDiagram: UMLDiagramSaveDto = {
        ...diagram,
        connections: diagram.connections as UMLTableConnectionDto[],
        tables: diagram.tables.map((table) => ({
          ...table,
          columns: table.columns as UMLTableColumnDto[],
        })) as UMLTableDto[],
      };

      await saveUmlDiagram(newDiagram);
    } catch (error) {
      throw error;
    }
  }
}
