import { useState } from 'react'

import Head from 'next/head'
import { useSpring, animated } from 'react-spring'
import Switch from "react-switch"

import styles from '../styles/Home.module.css'

const tags = [
  {
    name: 'Android',
    color: 'green'
  },
  {
    name: 'iOS',
    color: 'gray'
  },
  {
    name: 'Web',
    color: 'rgb(197, 114, 12)'
  }
]

export default function Home() {
  const [contributors, setContributors] = useState([
    {
      id: 1,
      name: 'Rey',
      imageUrl: 'https://images.unsplash.com/photo-1584799235813-aaf50775698c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      tag: 'Android',
      taskLevel: 7
    },
    {
      id: 2,
      name: 'Nald',
      imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
      tag: 'Android',
      taskLevel: 0
    },
    {
      id: 3,
      name: 'Prabha',
      imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
      tag: 'iOS',
      taskLevel: 5
    },
    {
      id: 4,
      name: 'Nova',
      imageUrl: 'https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
      tag: 'Web',
      taskLevel: 3
    },
  ])
  const [hoveringAtId, setHoveringAtId] = useState('')
  const [search, setSearch] = useState('')
  const [isShowOnlyUnassignedContributor, setIsShowOnlyUnassignedContributor] = useState(false)

  const filteredContributors = contributors.filter(contributor => {
    return (
      (
        contributor.name.trim().toLowerCase().includes(search.trim().toLowerCase())
        || contributor.tag.trim().toLowerCase().includes(search.trim().toLowerCase())
      )
      && (
        !isShowOnlyUnassignedContributor
        || contributor.taskLevel == 0
      )
    )
  })
  
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

              <input
                className={styles.searchInput}
                onChange={data => {
                  setHoveringAtId('')

                  setSearch(data.nativeEvent.target.value)
                }}
                placeholder='Search by name or tag...'
              />
            </div>
          </div>

          <div className={styles.contributorsListContainer}>
            <div className={styles.contributorsListInnerContainer}>
              <div className={styles.contributorsListFiller} />

              {
                filteredContributors.map((contributor, contributorIndex) => (
                  <div
                    key={contributor.id}
                  >
                    <div
                      style={{
                        marginLeft: contributorIndex == 0 ? 20 : 10,
                        marginRight: contributorIndex == filteredContributors.length -1 ? 20 : 10,
                      }}
                    >
                      <Contributor
                        contributor={contributor}
                        isFocused={hoveringAtId == '' || hoveringAtId == contributor.id.toString()}
                        onMouseEnter={() => setHoveringAtId(contributor.id.toString())}
                        onMouseLeave={() => setHoveringAtId('')}
                      />
                    </div>
                  </div>
                ))
              }

              <div className={styles.contributorsListFiller} />
            </div>
          </div>

          <div
            style={{
              alignItems: 'center',
              position: 'fixed',
              display: 'flex',
              bottom: 0,
              backgroundColor: 'dimgray',
              height: 60,
              width: '100%',
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Switch
                onChange={setIsShowOnlyUnassignedContributor}
                checked={isShowOnlyUnassignedContributor}
              />

              <div
                style={{
                  color: 'white',
                  marginLeft: 10
                }}
              >
                Show Unassigned Only
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function Contributor(props) {
  const { contributor, isFocused, onMouseEnter, onMouseLeave } = props

  const animation = useSpring({ opacity: isFocused ? 1.0 : 0.2, config: {duration: 500}, from: { opacity: isFocused ? 0.2 : 1 } })

  function getTagBackgroundColor() {
    let backgroundColor = '#00ADB5'

    for(const tag of tags) {
      if(contributor.tag == tag.name) {
        backgroundColor = tag.color

        break
      }
    }

    return backgroundColor
  }

  let taskLevelBackgroundColor = ''

  if(contributor.taskLevel < 4) {
    taskLevelBackgroundColor = 'forestgreen'
  } else if(contributor.taskLevel < 7) {
    taskLevelBackgroundColor = 'darkgoldenrod'
  } else {
    taskLevelBackgroundColor = 'rgb(184, 18, 51)'
  }

  return (
    <animated.a
      className={styles.contributor}
      href='/#'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        opacity: animation.opacity
      }}
    >
      <img
        className={styles.contributorPhoto}
        src={contributor.imageUrl}
      />

      <div className={styles.progressBarContainer}>
        {
          ['', '', '', '', '', '', '', ''].map((item, index) => (
            <div
              className={styles.progressBarItem}
              key={contributor.id + ' task level - ' + index}
              style={{
                backgroundColor: contributor.taskLevel > index ? taskLevelBackgroundColor : 'rgba(255, 255, 255, 0.2)',
                marginLeft: index == 0 ? 0 : 7.5
              }}
            >
              {index + 1}
            </div>
          ))
        }
      </div>

      <div className={styles.contributorName}>
        {contributor.name}
      </div>

      <div
        className={styles.contributorTag}
        style={{
          backgroundColor: getTagBackgroundColor()
        }}
      >
        {contributor.tag}
      </div>
    </animated.a>
  )
}