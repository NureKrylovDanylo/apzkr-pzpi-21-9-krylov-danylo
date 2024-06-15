import uuid from "react-uuid";
import { UMLDiagram } from "../interfaces/Models/UMLDiagram";
import { UMLTableColumn } from "../interfaces/Models/UMLTableColumn";

const defaultColumnName = "column";

export const useColumn = (
  diagram: UMLDiagram | undefined,
  setDiagram: (diagram: UMLDiagram) => void
): {
  editColumn: (newColumn: UMLTableColumn) => void;
  addColumn: (tableId: string) => void;
  deleteColumn: (columnId: string) => void;
} => {
  const editColumn = (newColumn: UMLTableColumn) => {
    if (diagram) {
      setDiagram({
        ...diagram,
        tables: diagram.tables.map((table) => {
          return {
            ...table,
            columns: table.columns.map((column) => {
              if (column.tableColumnId === newColumn.tableColumnId) {
                return newColumn;
              }
              return column;
            }),
          };
        }),
      });
    }
  };

  const addColumn = (tableId: string) => {
    if (diagram) {
      const existingColumnNames = diagram.tables
        .find((table) => table.tableId === tableId)
        ?.columns.map((column) => column.name);
      let columnName = defaultColumnName;
      if (existingColumnNames) {
        for (let i = 1; existingColumnNames.includes(columnName); ++i) {
          columnName = `${defaultColumnName}${i}`;
        }
      }

      const newColumn: UMLTableColumn = {
        tableColumnId: uuid(),
        name: columnName,
        dataType: 0,
      };

      setDiagram({
        ...diagram,
        tables: diagram.tables.map((table) => {
          if (table.tableId === tableId) {
            return {
              ...table,
              columns: [...table.columns, newColumn],
            };
          }

          return table;
        }),
      });
    }
  };

  const deleteColumn = (columnId: string) => {
    if (diagram) {
      const tableIndex = diagram.tables.findIndex((t) =>t.columns.some((c) => c.tableColumnId === columnId));

      if (tableIndex !== -1) {
          const updatedTable = {
              ...diagram.tables[tableIndex],
              columns: diagram.tables[tableIndex].columns.filter((column) => column.tableColumnId !== columnId),
          };

          const updatedTables = [...diagram.tables];
          updatedTables.splice(tableIndex, 1, updatedTable);
          setDiagram({ ...diagram, tables: updatedTables });
      }
  }
  };

  return {
    editColumn,
    addColumn,
    deleteColumn,
  };
};
