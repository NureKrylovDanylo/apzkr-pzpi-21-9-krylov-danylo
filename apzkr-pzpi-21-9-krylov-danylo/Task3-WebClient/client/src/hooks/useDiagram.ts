import { Dispatch, SetStateAction, useState, useEffect } from "react";
import uuid from "react-uuid";
import { getUmlDiagram, saveUmlDiagram } from "../http/umlApi";
import { UMLDiagramSaveDto } from "../interfaces/Dto/UMLDiagramSaveDto";
import { UMLTableColumnDto } from "../interfaces/Dto/UMLTableColumnDto";
import { UMLTableConnectionDto } from "../interfaces/Dto/UMLTableConnectionDto";
import { UMLTableDto } from "../interfaces/Dto/UMLTableDto";
import { IDimension } from "../interfaces/IDimension";
import { IPosition } from "../interfaces/IPosition";
import { UMLDiagram } from "../interfaces/Models/UMLDiagram";
import { UMLTable } from "../interfaces/Models/UMLTable";
import { UMLTableColumn } from "../interfaces/Models/UMLTableColumn";
import { UMLTableConnection } from "../interfaces/Models/UMLTableConnection";
import { DiagramService } from "../Services/DiagramService";
import { columnDataTypes } from "../types/UMLColumnDataType";
import { useColumn } from "./useColumn";
import { useTable } from "./useTable";

export const useDiagram = (): {
  saveDiagram: () => Promise<void>;
  diagram: UMLDiagram | undefined;
  setDiagram: Dispatch<SetStateAction<UMLDiagram | undefined>>;
  fetchDiagram: (id: string) => Promise<void>;
  addNewTable: () => void;
  deleteTable: (tableId: string) => void;
  editTableName: (tableId: string, val: string) => void;
  editColumn: (newColumn: UMLTableColumn) => void;
  deleteColumn: (columnId: string) => void;
  updateTableDimensions: (tableId: string, dimension: IDimension) => void;
  changeTablePosition: (tableId: string, position: IPosition) => void;
  addNewDiagram: (newDiagram: UMLDiagramSaveDto) => Promise<void>;
  addColumn: (tableId: string) => void;
} => {
  const [diagram, setDiagram] = useState<UMLDiagram>();
  const { addNewTable, deleteTable, editTableName, changeTablePosition, updateTableDimensions} = useTable(diagram, setDiagram);
  const { editColumn, addColumn, deleteColumn } = useColumn(diagram, setDiagram);
  const diagramService = new DiagramService();

  const saveDiagram = async () => {
    if (diagram) {
      await diagramService.save(diagram);
    }
  };

  const addNewDiagram = async (newDiagram: UMLDiagramSaveDto) => {
    await saveUmlDiagram(newDiagram);
  };

  const fetchDiagram = async (id: string) => {
    setDiagram(await diagramService.get(id));
  };

  useEffect(() => {
    if (diagram) {
      setDiagram({
        ...diagram,
        connections: [
          {
            tableConnectionId: uuid(),
            leftTableId: diagram.tables[0]!.tableId,
            leftTable: diagram.tables[0]!,
            rightTableId: diagram.tables[1]!.tableId,
            rightTable: diagram.tables[1]!,
            foreignKeyName: "string",
            connectionType: "ManyToOne",
          }
        ],
        diagramId: diagram?.diagramId || uuid(),
      });
    }
  }, [diagram?.tables]);

  return {
    saveDiagram,
    diagram,
    setDiagram,
    fetchDiagram,
    addNewTable,
    deleteTable,
    editColumn,
    deleteColumn,
    changeTablePosition,
    updateTableDimensions,
    addNewDiagram,
    addColumn,
    editTableName,
  };
};
