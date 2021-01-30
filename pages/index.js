import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useSpring, animated } from 'react-spring'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [contributors, setContributors] = useState(['', '', '', '', '', '', '', ''])
  const [hoveringAtIndex, setHoveringAtIndex] = useState('')
  
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.container}>
          <div className={styles.topNavContainer}>
            <div className={styles.topNav}>
              <a href='/'>
                <h2 className={styles.topNavTitle}>
                  CrocoBoard
                </h2>
              </a>
            </div>
          </div>

          <div className={styles.contributorsListContainer}>
            <div className={styles.contributorsListInnerContainer}>
              {
                contributors.map((contributor, contributorIndex) => (
                  <Contributor
                    contributorIndex = {contributorIndex}
                    opacity = {hoveringAtIndex == '' || hoveringAtIndex == contributorIndex ? 1 : 0.3}
                    onMouseEnter={() => setHoveringAtIndex(contributorIndex.toString())}
                    onMouseLeave={() => setHoveringAtIndex('')}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function Contributor(props) {
  const { contributorIndex, onMouseEnter, onMouseLeave, opacity } = props

  const animation = useSpring({ opacity: opacity == 1 ? 1.0 : 0.2, config: {duration: 500}, from: { opacity: opacity == 1 ? 0.2 : 1 } })

  return (
    <animated.a
      className={styles.contributor}
      href='/#'
      key = {contributorIndex}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style = {{
        opacity: animation.opacity
      }}
    >
      <img
        className={styles.contributorPhoto}
        src='https://images.unsplash.com/photo-1584799235813-aaf50775698c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      />

      <div className={styles.contributorName}>
        Andrew {contributorIndex}
      </div>
    </animated.a>
  )
}