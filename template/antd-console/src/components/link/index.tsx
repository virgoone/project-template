import { Button } from 'antd'
import type { ButtonProps } from 'antd/es/button'
import React from 'react'

export type LinkProps = {
  className?: string
} & Omit<ButtonProps, 'type' | 'className'>

const Link: React.FC<LinkProps> = ({ ...restProps }) => (
  <Button type="link" {...restProps} />
)

export default Link
