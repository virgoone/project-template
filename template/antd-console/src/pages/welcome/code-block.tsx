import React from 'react'
import { Button, Tooltip, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import clipboard from '../../utils/clipboard'
import styles from './style/code-block.less?modules'

interface CodeBlockProps {
  code: string
}

export default function CodeBlock(props: CodeBlockProps) {
  const { code } = props

  return (
    <pre className={styles['code-block']}>
      <code className={styles['code-block-content']}>{code}</code>
      <Tooltip title="点击复制命令">
        <Button
          type="text"
          className={styles['code-block-copy-btn']}
          icon={<CopyOutlined />}
          onClick={() => {
            clipboard(code)
            message.success('复制成功')
          }}
        />
      </Tooltip>
    </pre>
  )
}
