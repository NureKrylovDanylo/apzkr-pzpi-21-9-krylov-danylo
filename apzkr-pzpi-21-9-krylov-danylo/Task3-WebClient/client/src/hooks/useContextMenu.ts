import React, { MouseEvent, useState, ReactNode } from "react";
import { IPosition } from "../interfaces/IPosition";
import {ContextMenu} from '../components/UI/ContextMenu/ContextMenu';

export const useContextMenu = (): {
  showMenu: (e: MouseEvent<HTMLDivElement, MouseEvent>, children: ReactNode) => void;
  hideMenu: () => void;
  position: IPosition;
  isVisible: boolean,
  contextChildren: ReactNode,
} => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 });
  const [contextChildren, setContextChildren] = useState<ReactNode>();
  const showMenu = (e: MouseEvent<HTMLDivElement, MouseEvent>, children: ReactNode) => {
    e.preventDefault();
    e.stopPropagation();
    setContextChildren(children);
    setPosition({ x: e.clientX, y: e.clientY });
    console.log(isVisible)
    setIsVisible(true);
  }; 

  const hideMenu = () => setIsVisible(false);

  return {
    showMenu,
    hideMenu,
    position,
    isVisible,
    contextChildren
  };
};
