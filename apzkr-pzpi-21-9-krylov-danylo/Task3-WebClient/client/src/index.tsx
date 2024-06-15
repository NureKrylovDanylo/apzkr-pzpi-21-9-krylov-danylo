import React, { createContext, Dispatch, SetStateAction, MouseEvent, ReactNode} from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { User } from "./hooks/useUserAuthorization";
import { UMLDiagramSaveDto } from "./interfaces/Dto/UMLDiagramSaveDto";
import { UMLTableColumnDto } from "./interfaces/Dto/UMLTableColumnDto";
import { IDimension } from "./interfaces/IDimension";
import { IPosition } from "./interfaces/IPosition";
import { UMLDiagram } from "./interfaces/Models/UMLDiagram";
import { UMLTableColumn } from "./interfaces/Models/UMLTableColumn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

interface ContextValue {
  user: User | undefined;
  checkIsAuthorized: () => Promise<void>;
  isAuthorized: boolean;
}

interface DiagramContextValue {
  saveDiagram: () => Promise<void>,
  diagram: UMLDiagram | undefined,
  setDiagram: Dispatch<SetStateAction<UMLDiagram | undefined>>,
  fetchDiagram: (id: string) => Promise<void>,
  addNewTable: () => void,
  deleteTable: (tableId: string) => void,
  editTableName: (tableId: string, val: string) => void;
  editColumn: (newColumn: UMLTableColumn) => void,
  deleteColumn: (columnId: string) => void;
  updateTableDimensions: (tableId: string, dimension: IDimension) => void;
  changeTablePosition: (tableId: string, position: IPosition) => void;
  addNewDiagram: (newDiagram: UMLDiagramSaveDto) => Promise<void>,
  addColumn: (tableId: string) => void,
}

interface ContextMenuContextValue {
  showMenu: (e: MouseEvent<HTMLDivElement, MouseEvent>, children: ReactNode) => void;
  hideMenu: () => void;
  position: IPosition;
  isVisible: boolean,
  contextChildren: ReactNode,
}

export const UserSessionContext = createContext<ContextValue | null>(null);
export const DiagramContext = createContext<DiagramContextValue | null>(null);
export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

root.render(
  <App />
);
