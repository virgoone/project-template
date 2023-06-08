import React from 'react'
import { Skeleton, Statistic, Typography } from 'antd'
import cs from 'clsx'
import { G2, Column, Line, Pie } from '@ant-design/plots'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import styles from '../style/public-opinion.less?modules'

const { Title, Text } = Typography
const basicChartProps = {
  pure: true,
  autoFit: true,
  height: 80,
  padding: [10, 10, 0, 10],
}

export interface PublicOpinionCardProps {
  key: string
  title: string
  chartData?: any[]
  chartType: 'line' | 'interval' | 'pie'
  count?: number
  increment?: boolean
  diff?: number
  compareTime?: string
  loading?: boolean
}

function SimpleLine(props: { chartData: any[] }) {
  const { chartData = [] } = props
  return (
    <Line
      {...basicChartProps}
      data={chartData}
      smooth
      tooltip={false}
      xField="x"
      yField="y"
      xAxis={{ title: null, line: null, grid: null, label: null }}
      yAxis={{ title: null, line: null, grid: null, label: null }}
      seriesField="name"
      label={null}
      legend={false}
      color={['#165DFF', 'rgba(106,161,255,0.3)']}
      lineStyle={(item: any) => {
        if (item.name === '类目2') {
          return { lineDash: [8, 10], lineWidth: 3 }
        }
        return { lineWidth: 3 }
      }}
    />
  )
}

function SimpleInterval(props: { chartData: any[] }) {
  const { chartData = [] } = props

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
      group.addShape('rect', {
        attrs: {
          x: path[1][1], // 矩形起始点为左上角
          y: path[1][2],
          width: path[2][1] - path[1][1],
          height: path[0][2] - path[1][2],
          fill: cfg.color,
          radius: (path[2][1] - path[1][1]) / 2,
        },
      })
      return group
    },
  })
  return (
    <Column
      {...basicChartProps}
      data={chartData}
      tooltip={false}
      xField="x"
      yField="y"
      seriesField="x"
      xAxis={{ title: null, line: null, grid: null, label: null }}
      yAxis={{ title: null, line: null, grid: null, label: null }}
      // seriesField="name"
      label={null}
      legend={false}
      shape="border-radius"
      color={({ x }) => {
        if (Number(x) % 2 === 0) {
          return '#2CAB40'
        }
        return '#86DF6C'
      }}
    />
  )
}

function SimplePie(props: { chartData: any[] }) {
  const { chartData = [] } = props

  return (
    <Pie
      {...basicChartProps}
      data={chartData}
      padding={[0, 20, 0, 0]}
      angleField="count"
      colorField="name"
      label={false}
      radius={0.8}
      innerRadius={0.7}
      color={['#8D4EDA', '#00B2FF', '#165DFF']}
      legend={{ position: 'right' }}
      statistic={{ title: false, content: false }}
      interactions={[
        {
          type: 'element-single-selected',
        },
      ]}
    />
  )
}

function PublicOpinionCard(props: PublicOpinionCardProps) {
  const { chartType, title, count, increment, diff, chartData, loading } = props
  const className = cs(styles.card, styles[`card-${chartType}`])

  return (
    <div className={className}>
      <div className={styles.statistic}>
        <Statistic
          title={
            <Title level={5} className={styles.title}>
              {title}
            </Title>
          }
          loading={loading}
          value={count}
          groupSeparator=","
        />
        <div className={styles['compare-yesterday']}>
          <Text type="secondary" className={styles['compare-yesterday-text']}>
            {props.compareTime}
          </Text>
          <span
            className={cs(styles['diff'], {
              [styles['diff-increment']]: increment,
            })}
          >
            {loading ? (
              <Skeleton paragraph={{ rows: 1 }} active />
            ) : (
              <>
                {diff}
                {increment ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </>
            )}
          </span>
        </div>
      </div>
      <div className={styles.chart}>
        {loading ? (
          <Skeleton
            paragraph={{ rows: 3, width: Array(3).fill('100%') }}
            active
          />
        ) : (
          <>
            {chartType === 'interval' && (
              <SimpleInterval chartData={chartData} />
            )}
            {chartType === 'line' && <SimpleLine chartData={chartData} />}
            {chartType === 'pie' && <SimplePie chartData={chartData} />}
          </>
        )}
      </div>
    </div>
  )
}

export default PublicOpinionCard
