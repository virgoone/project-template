import React from 'react'
import './style.less'

function IndexPage(props: any) {
  console.log('props-->', props)
  return <div className="index-page">IndexPage</div>
}
IndexPage.getInitialProps = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({ hello: 'world' })
    }, 2000)
  })
}

export default IndexPage
