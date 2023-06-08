import React from 'react'
import { Spin } from 'antd'
import { Area } from '@ant-design/plots'
import CustomTooltip from './customer-tooltip'

function OverviewAreaLine({
  data = [],
  loading,
  name = '总内容量',
  color = '#4080FF',
}: {
  data: any[]
  loading: boolean
  name?: string
  color?: string
}) {
  const config = {
    height: 300,
    padding: [10, 20, 50, 40],
    autoFit: true,
    xField: 'date',
    yField: 'count',
    line: {
      color: 'l (0) 0:#1EE7FF .57:#249AFF .85:#6F42FB',
      size: 3,
      smooth: true,
    },
    smooth: true,
    yAxis: {
      grid: {
        line: {
          style: {
            lineDash: [4, 4],
          },
        },
      },
      label: {
        formatter(text: string) {
          return `${Number(text) / 1000}k`
        },
      },
    },
    xAxis: {
      // range: [0, 1],
      // tickCount: 5,
      grid: { line: { style: { stroke: '#E5E8EF' } } },
    },
    areaStyle: () => {
      return {
        smooth: true,
        fill: 'l (90) 0:rgba(17, 126, 255, 0.5)  1:rgba(17, 128, 255, 0)',
      }
    },
    tooltip: {
      showCrosshairs: true,
      showMarkers: true,
      marker: {
        lineWidth: 3,
        stroke: color,
        fill: '#ffffff',
        symbol: 'circle',
        r: 8,
      },
      customContent: (title: string, items: any) => {
        return (
          <CustomTooltip
            title={title}
            data={items}
            color={color}
            name={name}
            formatter={(value) => Number(value).toLocaleString()}
          />
        )
      },
    },
  }
  return (
    <Spin spinning={loading} style={{ width: '100%' }}>
      {!loading && <Area data={data} {...config} className={'chart-wrapper'} />}
    </Spin>
  )
}

export default OverviewAreaLine
