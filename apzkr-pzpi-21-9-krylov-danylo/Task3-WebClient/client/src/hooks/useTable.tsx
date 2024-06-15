import React, {useState, useEffect} from 'react'
import uuid from "react-uuid";
import { IDimension } from "../interfaces/IDimension";
import { IPosition } from "../interfaces/IPosition";
import { UMLDiagram } from "../interfaces/Models/UMLDiagram";
import { UMLTable } from "../interfaces/Models/UMLTable";

const defaultTableName = "NewTable";

export const useTable = (
  diagram: UMLDiagram | undefined,
  setDiagram: (diagram: UMLDiagram) => void
): {
    addNewTable: () => void;
  deleteTable: (tableId: string) => void;
  editTableName: (tableId: string, val: string) => void;
  updateTableDimensions: (tableId: string, dimension: IDimension) => void;
  changeTablePosition: (tableId: string, position: IPosition) => void;
} => {
  const [tableDimensions, setTableDimensions] = useState<{ [key: string]: IDimension }>({});

  const addNewTable = () => {
    if (diagram) {
      const existingTableNames = diagram.tables.map((table) => table.name);
      let tableName = defaultTableName;
      for (let i = 1; existingTableNames.includes(tableName); ++i) {
        tableName = `${defaultTableName}${i}`;
      }

      const newTable: UMLTable = {
        tableId: uuid(),
        name: tableName,
        position: { x: 0, y: 0 },
        dimensions: { width: 100, height: 100 },
        columns: [],
      };

      setDiagram({
        ...diagram,
        tables: [...diagram.tables, newTable],
      });
    }
  };

  const deleteTable = (tableId: string) => {
    if (diagram) {
      setDiagram({
        ...diagram,
        tables: diagram.tables.filter((table) => table.tableId !== tableId),
      });
    }
  };

  const editTableName = (tableId: string, val: string) => {
    if (diagram) {
        setDiagram({
            ...diagram,
            tables: diagram.tables.map((table) => {
                if (table.tableId === tableId) {
                    return {
                        ...table,
                        name: val
                    }
                }

                return table;
            })
        })
    }
  };

  const changeTablePosition = (tableId: string, position: IPosition) => {
    if (diagram) {
      const newDiagram: UMLDiagram = {
        ...diagram,
        tables: diagram.tables.map((table) => {
          if (table.tableId === tableId) {
            return { ...table, position: position };
          }

          return table;
        }),
      };

      setDiagram(newDiagram);
    }
  };
  
  const updateTableDimensions = (tableId: string, dimension: IDimension) => {
    setTableDimensions((prevDimensions) => ({
      ...prevDimensions,
      [tableId]: dimension,
    }));
  };

  useEffect(() => {
    if (diagram) {
      setDiagram({
        ...diagram,
        tables: diagram?.tables.map((table) => {
          return {...table, dimensions: tableDimensions[table.tableId]}
        })
      });
    } 
}, [tableDimensions])

  return {
    addNewTable,
    deleteTable,
    editTableName,
    changeTablePosition,
    updateTableDimensions
  };
};
