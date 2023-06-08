import React from 'react'
import { Card } from '@arco-design/web-react'
import cs from 'clsx'
import { IconPlus } from '@arco-design/web-react/icon'
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
          <IconPlus />
        </div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </Card>
  )
}

export default AddCard
