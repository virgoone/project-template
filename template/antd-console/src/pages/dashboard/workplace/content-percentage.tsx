import React, { useState, useEffect } from 'react'
import { Card, Spin } from 'antd'
import { Pie } from '@ant-design/plots'
import axios from 'axios'
import useLocale from './locale/useLocale'

function PopularContent() {
  const locale = useLocale()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    axios
      .get('/api/workplace/content-percentage')
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card
      title={locale['workplace.contentPercentage']}
      headStyle={{ borderBottom: 0 }}
      bordered={false}
      style={{ boxShadow: 'none' }}
    >
      <Spin spinning={loading} style={{ display: 'block' }}>
        {!loading && (
          <Pie
            autoFit
            data={data}
            height={340}
            radius={0.7}
            innerRadius={0.65}
            color={['#21CCFF', '#313CA9', '#249EFF']}
            interactions={[
              {
                type: 'element-single-selected',
              },
            ]}
            angleField="count"
            colorField="type"
            tooltip={{ showMarkers: false }}
            label={{
              // visible: true,
              type: 'spider',
              formatter: (v) => `${(v.percent * 100).toFixed(0)}%`,
              style: {
                fill: '#86909C',
                fontSize: 14,
              },
            }}
            legend={{
              position: 'bottom',
            }}
            statistic={{
              title: {
                style: {
                  fontSize: '14px',
                  lineHeight: 2,
                  color: 'rgb(--var(color-text-1))',
                },
                formatter: () => '内容量',
              },
              content: {
                style: {
                  fontSize: '16px',
                  color: 'rgb(--var(color-text-1))',
                },
                formatter: (_, data: any[]) => {
                  const sum = data.reduce((a, b) => a + b.count, 0)
                  return Number(sum).toLocaleString()
                },
              },
            }}
          />
        )}
      </Spin>
    </Card>
  )
}

export default PopularContent
