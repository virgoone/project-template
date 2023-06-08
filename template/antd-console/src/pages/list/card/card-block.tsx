import React, { useEffect, useState } from 'react'
import { QualityInspection, BasicCard } from './interface'
import {
  Button,
  Switch,
  Tag,
  Card,
  Descriptions,
  Typography,
  Dropdown,
  Menu,
  Skeleton,
} from 'antd'
import cs from 'clsx'
import {
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import styles from './style/index.less?modules'
import {
  IconSunFill,
  IconPenFill,
  IconFaceSmileFill,
  IconThumbUpFill,
} from '@/components/icon'

interface CardBlockType {
  type: 'quality' | 'service' | 'rules' | 'all'
  card: QualityInspection & BasicCard
  loading?: boolean
}

const IconList = [
  StarOutlined,
  IconThumbUpFill,
  IconSunFill,
  IconFaceSmileFill,
  IconPenFill,
].map((Tag, index) => <Tag key={index} />)

const { Paragraph } = Typography

function CardBlock(props: CardBlockType) {
  const { type, card = {} } = props
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(card.status)
  const [loading, setLoading] = useState(props.loading)

  const changeStatus = async () => {
    setLoading(true)
    await new Promise((resolve) =>
      setTimeout(() => {
        setStatus(status !== 1 ? 1 : 0)
        resolve(null)
      }, 1000)
    ).finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(props.loading)
  }, [props.loading])

  useEffect(() => {
    if (card.status !== status) {
      setStatus(card.status)
    }
  }, [card.status])

  const getTitleIcon = () => {
    if (type === 'service' && typeof card.icon === 'number') {
      return (
        <div className={styles.icon}>
          {IconList[card.icon % IconList.length]}
        </div>
      )
    }
    return null
  }

  const getButtonGroup = () => {
    if (type === 'quality') {
      return (
        <>
          <Button
            type="primary"
            style={{ marginLeft: '12px' }}
            loading={loading}
          >
            质检
          </Button>
          <Button loading={loading}>删除</Button>
        </>
      )
    }

    if (type === 'service') {
      return (
        <>
          {status === 1 ? (
            <Button loading={loading} onClick={changeStatus}>
              取消开通
            </Button>
          ) : (
            <Button type="default" loading={loading} onClick={changeStatus}>
              {status === 0 ? '开通服务' : '续约服务'}
            </Button>
          )}
        </>
      )
    }

    return (
      <Switch checked={!!status} loading={loading} onChange={changeStatus} />
    )
  }

  const getStatus = () => {
    if (type === 'rules' && status) {
      return (
        <Tag
          color="green"
          icon={<CheckCircleOutlined />}
          className={styles.status}
        >
          已启用
        </Tag>
      )
    }
    switch (status) {
      case 1:
        return (
          <Tag
            color="green"
            icon={<CheckCircleOutlined />}
            className={styles.status}
          >
            已开通
          </Tag>
        )
      case 2:
        return (
          <Tag
            color="red"
            icon={<CloseCircleOutlined />}
            className={styles.status}
          >
            已过期
          </Tag>
        )
      default:
        return null
    }
  }

  const getContent = () => {
    if (loading) {
      return (
        <Skeleton
          title={false}
          paragraph={{ rows: type !== 'quality' ? 3 : 2 }}
          active
          className={styles['card-block-skeleton']}
        />
      )
    }
    if (type !== 'quality') {
      return <Paragraph>{card.description}</Paragraph>
    }
    return (
      <Descriptions column={2}>
        {[
          { label: '待质检数', value: card.qualityCount },
          { label: '积压时长', value: `${card.duration}s` },
          { label: '待抽检数', value: card.randomCount },
        ].map((item) => (
          <Descriptions.Item label={item.label}>{item.value}</Descriptions.Item>
        ))}
      </Descriptions>
    )
  }

  const className = cs(styles['card-block'], styles[`${type}-card`])

  return (
    <Card
      bordered={true}
      className={className}
      title={
        loading ? (
          <Skeleton
            active
            paragraph={false}
            style={{ width: '120px', height: '24px' }}
            className={styles['card-block-skeleton']}
          />
        ) : (
          <>
            <div
              className={cs(styles.title, {
                [styles['title-more']]: visible,
              })}
            >
              {getTitleIcon()}
              {card.title}
              {getStatus()}
              <Dropdown
                menu={{
                  items: [
                    { label: '操作1', key: 'op1' },
                    { label: '操作2', key: 'op2' },
                  ],
                }}
                trigger={['click']}
                onVisibleChange={setVisible}
                // popupVisible={visible}
              >
                <div className={styles.more}>
                  <MoreOutlined />
                </div>
              </Dropdown>
            </div>
            <div className={styles.time}>{card.time}</div>
          </>
        )
      }
    >
      <div className={styles.content}>{getContent()}</div>
      <div className={styles.extra}>{getButtonGroup()}</div>
    </Card>
  )
}

export default CardBlock
