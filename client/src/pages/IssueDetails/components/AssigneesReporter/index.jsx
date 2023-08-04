import { useState, useEffect, useRef } from 'react'
import Select from '@/components/Select'
import { getAllUserList, getUserAvatar } from '@/services'
export default function AssigneesReporter({ type, issueData }) {
  const [options, setOptions] = useState([])
  const init = () => {
    getAllUserList().then((res) => {
      setOptions(
        res.data.map((item) => {
          return { label: item.userName, key: item._id, avatar: item.userAvatar }
        })
      )
    })
  }
  useEffect(() => {
    init()
    getUserAvatar(issueData?.key).then((res) => {
      setSelectedStatus({ ...issueData, avatar: res.data.userAvatar })
    })
  }, [issueData, issueData?.key])
  const assigneesRef = useRef(null)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [selectedStatus, setSelectedStatus] = useState({})

  useEffect(() => {
    document.addEventListener('click', (e) => changeStatus(e))
    return () => {
      document.removeEventListener('click', (e) => changeStatus(e))
    }
  })
  const stopPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }
  const changeStatus = (e) => {
    if (!assigneesRef.current?.contains(e.target)) {
      setIsDrawerOpen(false)
    } else {
      setIsDrawerOpen(true)
    }
  }
  const selectStatus = (item, e) => {
    stopPropagation(e)
    setSelectedStatus(item)
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <div ref={assigneesRef}>
      <Select
        name={type}
        select={selectStatus}
        onClick={changeStatus}
        isDrawerOpen={isDrawerOpen}
        title="ASSIGNEES"
        selected={selectedStatus}
        options={options}
      ></Select>
    </div>
  )
}
