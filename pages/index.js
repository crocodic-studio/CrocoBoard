import { useState } from 'react'

import Head from 'next/head'
import { useSpring, animated } from 'react-spring'
import Switch from "react-switch"
import Select from "react-dropdown-select"

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

const options = [
  'TOI', 'Erela Customer', 'Tirai ATM', 'MPM', 'EzFit', 'Angkasa Pura'
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
  const [selectedContributor, setSelectedContributor] = useState(null)

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
                        onClick={() => setSelectedContributor(contributor)}
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
              flexWrap: 'wrap',
              bottom: 0,
              backgroundColor: 'rgb(40, 40, 40)',
              height: 100,
              width: '100%',
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: 'space-around'
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Switch
                onChange={setIsShowOnlyUnassignedContributor}
                checked={isShowOnlyUnassignedContributor}
              />

              <div
                style={{
                  color: 'white',
                  fontSize: 14,
                  marginLeft: 10
                }}
              >
                Show Unassigned Only
              </div>
            </div>

            <a
              href='#'
              style={{
                backgroundColor: 'green',
                borderRadius: 10,
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold',
                marginLeft: 10,
                marginRight: 10,
                padding: 10
              }}
            >
              Notify All Unassigned Contributors
            </a>
          </div>
        </div>

        {
          selectedContributor != undefined ?
            <ContributorDetailModal
              contributor={selectedContributor}
              onCloseModal={() => setSelectedContributor(null)}
            />
            :
            null
        }
      </main>
    </>
  )
}

function Contributor(props) {
  const { contributor, isFocused, onMouseEnter, onMouseLeave, onClick } = props

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
      onClick={onClick}
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
          contributor.taskLevel > 8 ?
            <div
              className={styles.progressBarItem}
              style={{
                backgroundColor: 'maroon'
              }}
            >
              {contributor.taskLevel}
            </div>
            :
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

function ContributorDetailModal(props) {
  const { contributor, onCloseModal } = props

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

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div
        style = {{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: -1
        }}
      />

      <div>
        <div
          style={{
            borderRadius: 5,
            display: 'flex',
            backgroundColor: 'rgb(40, 40, 40)',
            overflow: 'hidden'
          }}
        >
          <img
            src={contributor.imageUrl}
            style={{
              objectFit: 'cover'
            }}
            height={300}
            width={300}
          />

          <div
            style={{
              padding: 20,
              width: 300
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <h2 className={styles.selectedContributorName}>
                {contributor.name}
              </h2>

              <div
                className={styles.contributorTag}
                style={{
                  backgroundColor: getTagBackgroundColor()
                }}
              >
                {contributor.tag}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            marginTop: 20
          }}
        >
          <div className={styles.optionsContainer}>
            {
              ['', '', '', '', ''].map((item, index) => (
                <div
                  style={{
                    marginLeft: index == 0 ? 0 : 20
                  }}
                >
                  <Select
                    placeholder='Project Name'
                    disabled = {false}
                    key={index}
                    options={options.map(label => ({label}))}
                    onChange={(values) => {}}
                    style={{
                      backgroundColor: 'rgb(200, 200, 200)',
                      width: 200
                    }}
                  />

                  <input
                    placeholder='Level'
                    style={{
                      backgroundColor: 'rgb(200, 200, 200)',
                      height: 40,
                      fontSize: 16,
                      marginTop: 10,
                      width: '100%',
                      paddingLeft: 5
                    }}
                  />

                  <input
                    placeholder='Keterangan'
                    style={{
                      backgroundColor: 'rgb(200, 200, 200)',
                      height: 40,
                      fontSize: 16,
                      marginTop: 10,
                      width: '100%',
                      paddingLeft: 5
                    }}
                  />
                </div>
              ))
            }
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: 180,
              marginLeft: 20
            }}
          >
            <a
              href='#'
              style={{
                borderRadius: 5,
                backgroundColor: 'deepskyblue',
                color: 'white',
                padding: 10,
                textAlign: 'center'
              }}
            >
              Copy From Previous
            </a>

            <a
              href='#'
              style={{
                borderRadius: 5,
                backgroundColor: 'crimson',
                color: 'white',
                padding: 10,
                textAlign: 'center',
                marginTop: 10
              }}
            >
              Reset
            </a>

            <a
              href='#'
              style={{
                borderRadius: 5,
                backgroundColor: 'green',
                color: 'white',
                padding: 10,
                textAlign: 'center',
                marginTop: 10
              }}
            >
              Apply
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}