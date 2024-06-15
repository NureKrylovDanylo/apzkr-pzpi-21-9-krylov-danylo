import React from 'react'
import cl from './Arrow.module.css'

interface IProps {
    active: boolean,
    size: number,
}

export const Arrow = ({active, size}: IProps) => {
  return (
    <div style={{width: size, height: size}} className={[cl.arrow, active && cl.active].join(' ')}></div>
  )
}
