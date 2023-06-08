import React from 'react'
import { Spin } from '@arco-design/web-react'
import { Column } from '@ant-design/plots'
import CustomTooltip from './customer-tooltip'

function MultiInterval({
  data = [],
  loading,
}: {
  data: any[]
  loading: boolean
}) {
  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      {!loading && (
        <Column
          data={data}
          height={370}
          yField="count"
          xField="time"
          yAxis={{
            label: {
              formatter(text) {
                return `${Number(text) / 1000}k`
              },
            },
          }}
          padding="auto"
          autoFit
          isStack
          seriesField="name"
          className={'chart-wrapper'}
          color={['#81E2FF', '#00B2FF', '#246EFF']}
          minColumnWidth={16}
          maxColumnWidth={16}
          legend={{
            position: 'bottom',
          }}
          tooltip={{
            showCrosshairs: true,
            shared: true,
            crosshairs: { type: 'x' },
            customContent: (title: string, items: any) => {
              return <CustomTooltip title={title} data={items} />
            },
          }}
        />
      )}
    </Spin>
  )
}

export default MultiInterval
