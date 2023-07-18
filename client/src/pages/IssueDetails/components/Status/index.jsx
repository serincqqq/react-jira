import { useState, useEffect, useRef } from 'react'
import Select from '@/components/Select'
import { updateIssue } from '@/services'
export default function Status({ issueData }) {
  const childRef = useRef(null)
  const statusOptions = [
    {
      label: 'done',
      key: 'done',
    },
    {
      label: 'backlog',
      key: 'backlog',
    },
    {
      label: 'select for development',
      key: 'selected',
    },
    {
      label: 'in progress',
      key: 'inprogress',
    },
  ]
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(issueData.status)

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
    if (!childRef.current?.contains(e.target)) {
      setIsDrawerOpen(false)
    } else {
      setIsDrawerOpen(true)
    }
  }
  const selectStatus = (item, e) => {
    stopPropagation(e)
    setSelectedStatus(item)
    updateIssue(issueData._id, { status: item, updatedAt: new Date() }).then((res) =>
      console.log('x', res)
    )
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <div ref={childRef}>
      <Select
        name="status"
        select={selectStatus}
        onClick={changeStatus}
        isDrawerOpen={isDrawerOpen}
        title="STATUS"
        selected={selectedStatus}
        options={statusOptions}
      ></Select>
    </div>
  )
}
