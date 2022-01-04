import React from 'react'
import * as svg from './svg'

export type IconControlType = keyof typeof svg
export type IconControlProps = {
  name: IconControlType
  className?: string
  style?: React.CSSProperties
}

function VeloIcon({ name, className, style }: IconControlProps) {
  return React.createElement(svg[name], {
    className,
    style,
  })
}

export default VeloIcon
