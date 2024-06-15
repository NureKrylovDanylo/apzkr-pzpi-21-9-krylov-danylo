import React from 'react'
import { NavLink } from 'react-router-dom';
import { UMLDiagram } from '../../../interfaces/Models/UMLDiagram';
import { UML_CREATOR_ROUTE } from '../../../routesConsts';
import cl from './DiagramItem.module.css';

interface IProps {
    diagram: UMLDiagram,
}

export const DiagramItem = ({diagram}: IProps) => {
  return (
    <div className={cl.item}>
        {diagram.name}
        <NavLink to={UML_CREATOR_ROUTE + `/${diagram.diagramId}`}>Go to</NavLink>
    </div>
  )
}
