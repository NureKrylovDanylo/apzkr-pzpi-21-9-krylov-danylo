import React from 'react'
import { DiagramContext } from '../../..';
import { useDiagram } from '../../../hooks/useDiagram';
import { Steps } from '../../components/Steps/Steps';
import { UmlCreator } from '../../components/UmlCreator/UmlCreator';
import cl from './Project.module.css';

export const Project = () => {
  const diagramValue = useDiagram();
  return (
    <div className={cl.wrapper}>
    <Steps stepIndex={1}></Steps>
    <DiagramContext.Provider value={diagramValue}>
      <UmlCreator></UmlCreator>
    </DiagramContext.Provider>
  </div>
  )
}
