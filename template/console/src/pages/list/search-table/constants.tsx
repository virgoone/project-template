import React from 'react'
import { Button, Typography, Badge } from '@arco-design/web-react'
import dayjs from 'dayjs'
import { ReactComponent as IconText } from './icons/text.svg'
import { ReactComponent as IconHorizontalVideo } from './icons/horizontal.svg'
import { ReactComponent as IconVerticalVideo } from './icons/vertical.svg'
import styles from './style/index.less?modules'

const { Text } = Typography

export const ContentType = ['图文', '横版短视频', '竖版短视频']
export const FilterType = ['规则筛选', '人工']
export const Status = ['未上线', '已上线']

const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
]

export function getColumns(
  locale: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: locale['searchTable.columns.id'],
      dataIndex: 'id',
      render: (value: any) => <Text copyable>{value}</Text>,
    },
    {
      title: locale['searchTable.columns.name'],
      dataIndex: 'name',
    },
    {
      title: locale['searchTable.columns.contentType'],
      dataIndex: 'contentType',
      render: (value: any) => (
        <div className={styles['content-type']}>
          {ContentIcon[value]}
          {ContentType[value]}
        </div>
      ),
    },
    {
      title: locale['searchTable.columns.filterType'],
      dataIndex: 'filterType',
      render: (value: any) => FilterType[value],
    },
    {
      title: locale['searchTable.columns.contentNum'],
      dataIndex: 'count',
      sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
      render(x: any) {
        return Number(x).toLocaleString()
      },
    },
    {
      title: locale['searchTable.columns.createdTime'],
      dataIndex: 'createdTime',
      render: (x: number) =>
        dayjs().subtract(x, 'days').format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a: { createdTime: number }, b: { createdTime: number }) =>
        b.createdTime - a.createdTime,
    },
    {
      title: locale['searchTable.columns.status'],
      dataIndex: 'status',
      render: (x: number) => {
        if (x === 0) {
          return <Badge status="error" text={Status[x]}></Badge>
        }
        return <Badge status="success" text={Status[x]}></Badge>
      },
    },
    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_: any, record: Record<string, any>) => (
        <Button
          type="text"
          size="small"
          onClick={() => callback(record, 'view')}
        >
          {locale['searchTable.columns.operations.view']}
        </Button>
      ),
    },
  ]
}

export default () => ContentIcon
