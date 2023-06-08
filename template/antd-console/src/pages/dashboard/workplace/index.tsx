import React from 'react'
import { Row, Col } from 'antd'
import Overview from './overview'
import PopularContents from './popular-contents'
import ContentPercentage from './content-percentage'
import Shortcuts from './shortcuts'
import Announcement from './announcement'
import Carousel from './carousel'
import Docs from './docs'
import styles from './style/index.less?modules'
import './mock'

const gutter = 16

function Workplace() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.panel}>
          <Overview />
        </div>
        <Row style={{ marginTop: gutter }}>
          <Col
            flex="1"
            className={styles.panel}
            style={{ marginRight: gutter }}
          >
            <PopularContents />
          </Col>
          <Col flex="1" className={styles.panel}>
            <ContentPercentage />
          </Col>
        </Row>
      </div>
      <div className={styles.right}>
        <div className={styles.panel}>
          <Shortcuts />
        </div>
        <div className={styles.panel} style={{ marginTop: gutter }}>
          <Carousel />
        </div>
        <div className={styles.panel} style={{ marginTop: gutter }}>
          <Announcement />
        </div>
        <div className={styles.panel} style={{ marginTop: gutter }}>
          <Docs />
        </div>
      </div>
    </div>
  )
}

export default Workplace
