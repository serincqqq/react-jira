import { useState, useEffect, Fragment, useRef } from 'react'
import Select from '@/components/Select'
export default function Status() {
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
  const [selectedStatus, setSelectedStatus] = useState({
    label: 'in progress',
    key: 'inprogress',
  })

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
    console.log(!childRef.current.contains(e.target), e.target)
    if (!childRef.current.contains(e.target)) {
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
    <div ref={childRef}>
      <Select name="status" select={selectStatus} onClick={changeStatus} isDrawerOpen={isDrawerOpen} title="STATUS" selected={selectedStatus} options={statusOptions}></Select>
    </div>
  )
}
