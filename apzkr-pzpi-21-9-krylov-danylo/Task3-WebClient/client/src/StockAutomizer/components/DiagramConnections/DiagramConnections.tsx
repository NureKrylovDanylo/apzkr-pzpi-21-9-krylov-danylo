import React, { useContext, useMemo } from "react";
import { DiagramContext } from "../../..";
import { IDimension } from "../../../interfaces/IDimension";
import { IPosition } from "../../../interfaces/IPosition";
import { UMLTable } from "../../../interfaces/Models/UMLTable";
import { UMLTableConnection } from "../../../interfaces/Models/UMLTableConnection";
import { DiagramLine } from "../UI/DiagramLine/DiagramLine";
import cl from "./DiagramConnections.module.css";

interface ILine {
  start: IPosition;
  end: IPosition;
}

export interface ILineConnection {
  start: ILine,
  middle: ILine,
  end: ILine,
  key: string
}

interface IDefineLocationProps<T extends IPosition | ILineConnection> {
  angleInDegrees: number,
  bottom: T,
  top: T,
  left: T,
  right: T
}

export const DiagramConnections = () => {
  const { diagram } = useContext(DiagramContext)!;
  const linesPositions: ILineConnection[] | undefined = useMemo(() => {
    if (!diagram) return undefined;

    const getTableCenterPoint = (position: IPosition, dimensions: IDimension): IPosition => {
      return {
        x: position.x + dimensions.width / 2,
        y: position.y + dimensions.height / 2,
      };
    };

    const getAngleInDegrees = (dx: number, dy: number): number => {
      return 360 - ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
    };

    const defineLocation = <T extends IPosition | ILineConnection>({angleInDegrees, bottom, top, left, right}: IDefineLocationProps<T>): T => {
      if (angleInDegrees >= 45 && angleInDegrees <= 135) {
        return bottom;
      } else if (angleInDegrees >= 225 && angleInDegrees <= 315) {
        return top;
      } else if (angleInDegrees < 225 && angleInDegrees > 135) {
        return right;
      } else {
        return left;
      }
    }

    const getZeroPointCoordinates = (leftTable?: UMLTable, rightTable?: UMLTable): {
      zeroPoint: IPosition,
      leftTableDimension: IDimension,
      rightTableDimension: IDimension,
      leftTablePosition: IPosition,
      rightTablePosition: IPosition,
      angleInDegrees: number
    } => {
      const leftTablePosition: IPosition = leftTable?.position ?? {x: 0, y: 0};
      const leftTableDimension: IDimension = leftTable?.dimensions ?? {width: 0, height: 0};
      const leftTableCenterPosition: IPosition = getTableCenterPoint(leftTablePosition, leftTableDimension);

      const rightTablePosition: IPosition = rightTable?.position ?? {x: 0, y: 0};
      const rightTableDimension: IDimension = rightTable?.dimensions ?? {width: 0, height: 0};
      const rightTableCenterPosition: IPosition = getTableCenterPoint(rightTablePosition, rightTableDimension);

      const dx = leftTableCenterPosition.x - rightTableCenterPosition.x;
      const dy = leftTableCenterPosition.y - rightTableCenterPosition.y;
      const angleInDegrees = getAngleInDegrees(dx, dy);

      const point = defineLocation<IPosition>({
        angleInDegrees,
        bottom: { x: leftTableCenterPosition.x, y: leftTablePosition.y + leftTableDimension.height },
        top: { x: leftTableCenterPosition.x, y: leftTablePosition.y },
        left: { x: leftTablePosition.x, y: leftTableCenterPosition.y },
        right: { x: leftTablePosition.x + leftTableDimension.width, y: leftTableCenterPosition.y }
      })

      return {
        zeroPoint: point,
        leftTableDimension,
        rightTableDimension,
        leftTablePosition,
        rightTablePosition,
        angleInDegrees
      };
    };

    const getLineConnection = (connection: UMLTableConnection): ILineConnection => {
      const leftTable = diagram.tables.find((table) => table.tableId === connection.leftTableId);
      const rightTable = diagram.tables.find((table) => table.tableId === connection.rightTableId);
  
      const { zeroPoint: leftZeroPoint, angleInDegrees } = getZeroPointCoordinates(leftTable, rightTable);
      const { zeroPoint: rightZeroPoint } = getZeroPointCoordinates(rightTable, leftTable);
  
      const verticalHalfLength = Math.abs(leftZeroPoint.y - rightZeroPoint.y) / 2;
      const horizontalHalfLength = Math.abs(rightZeroPoint.x - leftZeroPoint.x) / 2;
  
      const lineConnection = defineLocation<ILineConnection>({
        angleInDegrees,
        bottom: {
          key: connection.tableConnectionId,
          start: {start: { x: leftZeroPoint.x, y: leftZeroPoint.y }, end: { x: leftZeroPoint.x, y: leftZeroPoint.y + verticalHalfLength }},
          middle: {start: { x: leftZeroPoint.x, y: leftZeroPoint.y + verticalHalfLength }, end: { x: rightZeroPoint.x, y: rightZeroPoint.y - verticalHalfLength } },
          end: {start: { x: rightZeroPoint.x, y: rightZeroPoint.y - verticalHalfLength }, end: { x: rightZeroPoint.x, y: rightZeroPoint.y }}
        },
        top: {
          key: connection.tableConnectionId,
          start: { start: { x: leftZeroPoint.x, y: leftZeroPoint.y }, end: { x: leftZeroPoint.x, y: leftZeroPoint.y - verticalHalfLength }},
          middle: { start: { x: leftZeroPoint.x, y: leftZeroPoint.y - verticalHalfLength }, end: { x: rightZeroPoint.x, y: rightZeroPoint.y + verticalHalfLength }},
          end: { start: { x: rightZeroPoint.x, y: rightZeroPoint.y + verticalHalfLength }, end: { x: rightZeroPoint.x, y: rightZeroPoint.y }}
        },
        left: {
          key: connection.tableConnectionId,
          start: { start: { x: leftZeroPoint.x, y: leftZeroPoint.y }, end: { x: leftZeroPoint.x - horizontalHalfLength, y: leftZeroPoint.y }},
          middle: { start: { x: leftZeroPoint.x - horizontalHalfLength, y: leftZeroPoint.y }, end: { x: rightZeroPoint.x + horizontalHalfLength, y: rightZeroPoint.y } },
          end: { start: { x: rightZeroPoint.x + horizontalHalfLength, y: rightZeroPoint.y }, end: { x: rightZeroPoint.x, y: rightZeroPoint.y } }
        },
        right: {
          key: connection.tableConnectionId,
          start: { start: { x: leftZeroPoint.x, y: leftZeroPoint.y }, end: { x: leftZeroPoint.x + horizontalHalfLength, y: leftZeroPoint.y }},
          middle: { start: { x: leftZeroPoint.x + horizontalHalfLength, y: leftZeroPoint.y }, end: { x: rightZeroPoint.x - horizontalHalfLength, y: rightZeroPoint.y }},
          end: { start: { x: rightZeroPoint.x - horizontalHalfLength, y: rightZeroPoint.y }, end: { x: rightZeroPoint.x, y: rightZeroPoint.y } }
        }
      })

      return lineConnection;
  };

    return diagram.connections.map((connection: UMLTableConnection) => getLineConnection(connection));
  }, [diagram?.tables]);

  return (
    <div className={cl.items}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className={cl.svg}>
        {linesPositions?.map((lineConnection) => (
          <DiagramLine key={lineConnection.key} lineConnection={lineConnection}></DiagramLine>
        ))}
      </svg>
    </div>
  );
};
