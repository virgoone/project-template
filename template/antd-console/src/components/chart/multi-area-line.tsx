import React from 'react'
import { Spin } from 'antd'
import CustomTooltip from './customer-tooltip'
import { Area } from '@ant-design/plots'

const areaColorMap: Record<string, string> = {
  内容曝光量: 'l (90) 0:rgba(131, 100, 255, 0.5) 1:rgba(80, 52, 255, 0.001)',
  内容点击量: 'l (90) 0:rgba(255, 211, 100, 0.5) 1:rgba(255, 235, 52, 0.001)',
  内容生产量: 'l (90) 0:rgba(100, 255, 236, 0.5) 1:rgba(52, 255, 243, 0.001)',
  活跃用户数: 'l (90) 0:rgba(100, 162, 255, 0.5) 1:rgba(52, 105, 255, 0.001)',
}

const lineColorMap = ['#722ED1', '#33D1C9', '#F77234', '#165DFF']

function MultiAreaLine({
  data = [],
  loading,
}: {
  data: any[]
  loading: boolean
}) {
  return (
    <Spin spinning={loading} style={{ width: '100%' }}>
      {!loading && (
        <Area
          height={320}
          data={data}
          padding={[10, 0, 30, 30]}
          autoFit
          smooth
          isStack
          className={'chart-wrapper'}
          yField="count"
          xField="time"
          seriesField="name"
          color={lineColorMap}
          yAxis={{
            label: { formatter: (value) => `${Number(value) / 100} k` },
          }}
          legend={false}
          areaStyle={(item) => {
            return {
              smooth: true,
              fill:
                areaColorMap[item.name as string] ||
                'l (90) 0:rgba(17, 126, 255, 0.5)  1:rgba(17, 128, 255, 0)',
            }
          }}
          tooltip={{
            showCrosshairs: true,
            shared: true,
            crosshairs: { type: 'x' },
            showMarkers: true,
            customContent: (title: string, items: any) => {
              return (
                <CustomTooltip
                  title={title}
                  data={items.sort((a: any, b: any) => b.value - a.value)}
                  formatter={(value) => Number(value).toLocaleString()}
                />
              )
            },
          }}
        />
      )}
    </Spin>
  )
}

export default MultiAreaLine
