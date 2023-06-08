import React from 'react'
import { Spin } from '@arco-design/web-react'
import { Bar, G2 } from '@ant-design/plots'
import CustomTooltip from './customer-tooltip'

function HorizontalInterval({
  data = [],
  loading,
  height,
}: {
  data: any[]
  loading: boolean
  height?: number
}) {
  G2.registerShape('interval', 'border-radius', {
    draw(cfg, container) {
      const points = cfg.points as unknown as { x: string; y: number }[]
      let path = []
      path.push(['M', points[0].x, points[0].y])
      path.push(['L', points[1].x, points[1].y])
      path.push(['L', points[2].x, points[2].y])
      path.push(['L', points[3].x, points[3].y])
      path.push('Z')
      path = this.parsePath(path) // 将 0 - 1 转化为画布坐标

      const group = container.addGroup()
      const radius = (path[1][2] - path[2][2]) / 2
      group.addShape('rect', {
        attrs: {
          x: path[0][1], // 矩形起始点为左上角
          y: path[0][2] - radius * 2,
          width: path[1][1] - path[0][1],
          height: path[1][2] - path[2][2],
          fill: cfg.color,
          radius: radius,
        },
      })
      return group
    },
  })

  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      {!loading && (
        <Bar
          height={height || 370}
          padding="auto"
          xField="count"
          yField="name"
          xAxis={{
            label: {
              formatter(text) {
                return `${Number(text) / 1000}k`
              },
            },
          }}
          data={data}
          autoFit
          shape="border-radius"
          maxBarWidth={10}
          minBarWidth={10}
          color={'#4086FF'}
          className={'chart-wrapper'}
          legend={false}
          tooltip={{
            customContent: (title, items) => {
              return <CustomTooltip title={title} data={items} />
            },
          }}
        />
      )}
    </Spin>
  )
}

export default HorizontalInterval
