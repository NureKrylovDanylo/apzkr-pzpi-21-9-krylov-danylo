import React from 'react'
import { projectCreationSteps } from '../../../types/ProjectCreationStep';
import cl from './Steps.module.css';

interface IProps {
    stepIndex: number
}

export const Steps = ({stepIndex}: IProps) => {
  return (
    <div className={cl.steps}>
          {projectCreationSteps.map(({step, label}, index) =>
            <div key={step} className={[cl.step, stepIndex === index && cl.active].join(' ')}>{label}</div>
          )}
        </div>
  )
}
