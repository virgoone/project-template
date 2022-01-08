import React from 'react'
import { Link, Card } from '@arco-design/web-react'
import useLocale from './locale/useLocale'
import styles from './style/docs.scss?modules'

const links = {
  react: 'https://arco.design/react/docs/start',
  vue: 'https://arco.design/vue/docs/start',
  designLab: 'https://arco.design/themes',
  materialMarket: 'https://arco.design/material/',
}
function QuickOperation() {
  const locale = useLocale()

  return (
    <Card
      title={locale['workplace.docs']}
      extra={<Link>{locale['workplace.seeMore']}</Link>}
      headerStyle={{ borderBottom: 0 }}
    >
      <div className={styles.docs}>
        {Object.entries(links).map(([key, value]) => (
          <Link className={styles.link} key={key} href={value} target="_blank">
            {locale[`workplace.${key}`]}
          </Link>
        ))}
      </div>
    </Card>
  )
}

export default QuickOperation
