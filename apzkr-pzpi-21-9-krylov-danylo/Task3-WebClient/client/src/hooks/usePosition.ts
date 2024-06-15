import { RefObject, useRef, useState } from "react";
import { IDimension } from "../interfaces/IDimension";
import { IPosition } from "../interfaces/IPosition";

interface IHookPositionProps {
  elementPosition: IPosition;
  elementRef: RefObject<HTMLDivElement>
  onMoveFinished?: () => void;
  onMove?: () => void;
}

export const usePosition = ({elementPosition, onMoveFinished, onMove, elementRef}: IHookPositionProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<IPosition>({ x: 0, y: 0 });
  const [position, setPosition] = useState<IPosition>({
    x: elementPosition.x,
    y: elementPosition.y,
  });
  const [areaDemension, setAreaDemension] = useState<IDimension>({
    width: 0,
    height: 0,
  });

  const moveElement = (newX: number, newY: number) => {
    if (!elementRef.current) return;

    const { width, height } = elementRef.current.getBoundingClientRect();
    const maxX = areaDemension.width - width;
    const maxY = areaDemension.height - height;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isDragging) {
      moveElement(event.clientX - offset.x, event.clientY - offset.y);
      onMove && onMove();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onMoveFinished && onMoveFinished();
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setAreaDemension,
    position,
  };
};
