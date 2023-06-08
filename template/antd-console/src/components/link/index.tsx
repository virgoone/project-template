import { Button } from 'antd'
import type { ButtonProps } from 'antd/es/button'
import React from 'react'

export type LinkProps = {} & Omit<ButtonProps, 'type'>

const Link: React.FC<LinkProps> = ({ ...restProps }) => (
  <Button type="link" {...restProps} />
)

export default Link
