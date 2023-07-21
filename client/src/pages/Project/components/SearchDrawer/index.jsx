import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { Drawer, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import noResult from '@/assets/img/noresult.png'
import PubSub from 'pubsub-js'
import { SectionTitle, SearchInput, SearchInputDebounced, NoResult } from './Styles'
import Issue from '@/components/Issue'
import { getRecIssue, searchIssue } from '@/services'
import { useLocation } from 'react-router-dom'

function SearchDrawer() {
  const [searchResultText, setSearchResultText] = useState('Recent Issues')
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recIsssues, setRecIsssues] = useState([])
  const location = useLocation()
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
    init()
  }, [])
  /* 这里有一个很特别的bug,如果把location和searchInput都写在一个副作用中，
  补充：还是不能放一起，因为一个属性的改变会导致两部分代码都执行，交互会乱
  (注意：这里的代码执行的前后顺序决定了)是否出现这个bug，如果setSearchOpen(false)在前没问题，
  在后有问题
  那么正常情况下可以检测到路由变化，但是点击搜索出来的数据却无法检测路由变化*/
  useEffect(() => {
    setSearchOpen(false)
  }, [location]);
  const handleInputChange = useCallback((event) => {
    const input = event.target.value
    setSearchInput(input)
  }, [])
  const onClose = () => {
    setSearchOpen(false)
    setLoading(false)
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

export default SearchDrawer
