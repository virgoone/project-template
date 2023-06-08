import React from 'react'
import { Card } from 'antd'
import cs from 'clsx'
import { PlusOutlined } from '@ant-design/icons'
import styles from './style/index.less?modules'

interface AddCardProps {
  description?: string
}
function AddCard(props: AddCardProps) {
  return (
    <Card
      className={cs(styles['card-block'], styles['add-card'])}
      title={null}
      bordered={true}
    >
      <div className={styles.content}>
        <div className={styles['add-icon']}>
          <PlusOutlined />
        </div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </Card>
  )
}

export default AddCard
