import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import { Separator } from './separator'

export default function DashboardHeader(props: {
  title: string | React.ReactNode
  separator?: boolean
  subtitle?: React.ReactNode | string
  children: React.ReactNode
  showHeader?: boolean
}) {
  const {
    title,
    subtitle,
    children,
    separator = true,
    showHeader = true,
  } = props

  if (!showHeader) {
    return <>{children}</>
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        {separator && <Separator className="my-6" />}
        {children}
      </CardContent>
    </Card>
  )
}
