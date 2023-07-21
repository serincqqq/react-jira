import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { Drawer, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import noResult from '@/assets/img/noresult.png'
import PubSub from 'pubsub-js'
import './style.css'
import { SectionTitle, SearchInput, SearchInputDebounced, NoResult } from './Styles'
import Issue from '@/components/Issue'
import { getRecIssue, searchIssue } from '@/services'
function SearchDrawer() {
  const [searchResultText, setSearchResultText] = useState('Recent Issues')
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recIsssues, setRecIsssues] = useState([])
  const init = () => {
    setSearchInput('')
    setSearchResultText('Recent Issues')
    getRecIssue().then((res) => {
      setRecIsssues(res)
    })
  }
  useEffect(() => {
    if (searchInput !== '') {
      setLoading(true)
      const timer = setTimeout(() => {
        searchIssue(searchInput).then((res) => {
          if (res.code === 0) {
            setLoading(false)
            if (res.data.length === 0) {
              setSearchResultText('')
            } else {
              setSearchResultText('MATCHING ISSUES')
            }
            setRecIsssues(res.data)
          }
        })
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [searchInput])

  useEffect(() => {
    //订阅消息如果不放在生命周期钩子中就会调用多次
    init()
  }, [])

  const handleInputChange = useCallback((event) => {
    const input = event.target.value
    setSearchInput(input)
  }, [])
  const onClose = () => {
    setSearchOpen(false)
    init()
  }

  PubSub.subscribe('modalType', (_, modalType) => {
    if (modalType.modal === 'modal_search') setSearchOpen(true)
  })
  return (
    <Fragment>
      <Drawer
        style={{ width: '520px', position: 'relative' }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={searchOpen}
      >
        <SearchInput>
          <SearchOutlined style={{ fontSize: '22px', marginTop: '2px' }} />
          <SearchInputDebounced
            onChange={handleInputChange}
            value={searchInput}
            placeholder="Search issues by summary, description..."
          ></SearchInputDebounced>
          {loading ? <Spin /> : <></>}
        </SearchInput>
        <SectionTitle>{searchResultText}</SectionTitle>
        {recIsssues.length === 0 ? (
          <NoResult>
            <img src={noResult} alt="error" className="resImg"></img>
            <h4>We couldn't find anything matching your search</h4>
            <span>Try again with a different term.</span>
          </NoResult>
        ) : (
          ''
        )}
        {recIsssues.map((item) => (
          <Issue key={item._id} issue={item}></Issue>
        ))}
      </Drawer>
    </Fragment>
  )
}

// Modal.propTypes = propTypes;
// Modal.defaultProps = defaultProps;

export default SearchDrawer
