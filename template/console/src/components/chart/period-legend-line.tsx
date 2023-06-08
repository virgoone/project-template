import React from 'react'
import { Spin } from '@arco-design/web-react'
import { Line } from '@ant-design/plots'
import useBizTheme from '@/hooks/useChartTheme'
import CustomTooltip from './customer-tooltip'

const lineColor = ['#21CCFF', '#313CA9', '#249EFF']
function PeriodLine({ data = [], loading }: { data: any[]; loading: boolean }) {
  return (
    <Spin loading={loading} style={{ width: '100%' }}>
      {!loading && (
        <Line
          data={data}
          height={370}
          smooth
          autoFit
          color={lineColor}
          yField="rate"
          xField="time"
          seriesField="name"
          yAxis={{
            label: {
              formatter(text) {
                return `${Number(text)} %`
              },
            },
          }}
          padding={[10, 20, 120, 60]}
          theme={useBizTheme()}
          className={'chart-wrapper'}
          tooltip={{
            showCrosshairs: true,
            shared: true,
            crosshairs: { type: 'x' },
            customContent: (title: string, items: any) => {
              return <CustomTooltip title={title} data={items} />
            },
          }}
          legend={{
            position: 'bottom',
            marker: (_, index) => {
              return {
                symbol: 'circle',
                style: {
                  fill: lineColor[index],
                  r: 4,
                },
              }
            },
          }}
          slider={{
            handlerStyle: {
              fill: '#ffffff',
              opacity: 1,
              width: 22,
              height: 22,
              stroke: '#165DFF',
            },
            foregroundStyle: {
              borderRadius: ' 4px',
              fill: 'l (180) 0:rgba(206, 224, 255, 0.9) 1:rgba(146, 186, 255, 0.8)',
              opacity: 0.3,
            },
            trendCfg: {
              data: data.map((item) => item.rate),
              isArea: true,
              areaStyle: {
                fill: 'rgba(4, 135, 255, 0.15)',
                opacity: 1,
              },
              backgroundStyle: {
                fill: '#F2F3F5',
              },
              lineStyle: {
                stroke: 'rgba(36, 158, 255, 0.3)',
                lineWidth: 2,
              },
            },
          }}
        />
      )}
    </Spin>
  )
}

export default PeriodLine
