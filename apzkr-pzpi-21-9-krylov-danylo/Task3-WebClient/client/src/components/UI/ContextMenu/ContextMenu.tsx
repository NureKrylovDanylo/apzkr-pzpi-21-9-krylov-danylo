import React, { ReactNode } from 'react'
import { IPosition } from '../../../interfaces/IPosition';
import cl from './ContextMenu.module.css';

interface IProps {
    children: ReactNode,
    position: IPosition,
    onHide: () => void;
}

export const ContextMenu = ({children, position, onHide}: IProps) => {
  return (
    <div className={cl.container} onClick={onHide} onContextMenu={onHide}>
        <div className={cl.content} style={{top: position.y, left: position.x}} onClick={(e:any) => e.stopPropagation()}>
        <div className={cl.items}>{children}</div>
    </div>
    </div>
  )
}
