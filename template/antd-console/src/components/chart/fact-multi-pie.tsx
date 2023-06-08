import React from 'react'
import useBizTheme from '@/hooks/useChartTheme'
import { Facet } from '@ant-design/plots'

interface FactMultiPieProps {
  data: any[]
  loading: boolean
  height: number
}
function FactMultiPie(props: FactMultiPieProps) {
  const { data = [], height } = props
  return (
    <Facet
      theme={useBizTheme()}
      autoFit
      data={data}
      height={height || 400}
      padding={[0, 0, 10, 0]}
      type="rect"
      fields={['category']}
      showTitle={false}
      legend={{
        position: 'bottom',
      }}
      eachView={(_view, facet) => {
        return {
          type: 'pie',
          options: {
            data: facet.data,
            angleField: 'value',
            colorField: 'type',
            color: ['#249eff', '#846BCE', '#21CCFF', ' #86DF6C', '#0E42D2'],
            label: {
              content: (content: any) => {
                return `${(content.value * 100).toFixed(2)} %`
              },
            },
            radius: 0.8,
            innerRadius: 0.7,
            interactions: [
              {
                type: 'element-single-selected',
              },
            ],
            statistic: {
              title: false,
              content: {
                style: {
                  fontSize: '16px',
                  color: 'rgb(--var(color-text-1))',
                },
                content: (facet.data[0] as Record<string, any>)?.category,
              },
            },
          },
        }
      }}
    />
  )
}

export default FactMultiPie
