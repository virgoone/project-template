import React from 'react'
import { Spin } from 'antd'
import DataSet from '@antv/data-set'
import { Radar } from '@ant-design/plots'
import CustomTooltip from './customer-tooltip'

interface AreaPolarProps {
  data: any[]
  loading: boolean
  fields: string[]
  height: number
}
function AreaPolar(props: AreaPolarProps) {
  const { data = [], loading, fields, height } = props

  const { DataView } = DataSet
  const dv = new DataView().source(data)
  dv.transform({
    type: 'fold',
    fields: fields, // 展开字段集
    key: 'category', // key字段
    value: 'score', // value字段
  })
  const config = {
    // 开启辅助点
    point: {
      size: 2,
    },
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
  }

  return (
    <Spin spinning={loading} style={{ width: '100%' }}>
      {!loading && (
        <Radar
          height={height || 200}
          padding={[30, 0, 30, 0]}
          data={dv.rows}
          autoFit
          className={'chart-wrapper'}
          xField="item"
          yField="score"
          yAxis={{
            label: false,
          }}
          seriesField="category"
          color={['#313CA9', '#21CCFF', '#249EFF']}
          tooltip={{
            customContent: (title, items) => {
              return <CustomTooltip title={title} data={items} />
            },
          }}
          area={{
            color: [
              'rgba(49, 60, 169, 0.4)',
              'rgba(33, 204, 255, 0.4)',
              'rgba(36, 158, 255, 0.4)',
            ],
          }}
          legend={{
            position: 'right',
            marker: (_, index) => {
              return {
                symbol: 'circle',
                style: {
                  r: 4,
                  lineWidth: 0,
                  fill: ['#313CA9', '#21CCFF', '#249EFF'][index],
                },
              }
            },
          }}
          {...config}
        />
      )}
    </Spin>
  )
}

export default AreaPolar
