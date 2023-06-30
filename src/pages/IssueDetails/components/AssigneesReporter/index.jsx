import { useState, useEffect, useRef } from 'react'
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
    label: 'Jack',
    //key暂时以名字做标记，但是之后的话需要生成每个人唯一的id作为标记
    key: 'jack',
    avatar: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
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
      <Select name="assignees" select={selectStatus} onClick={changeStatus} isDrawerOpen={isDrawerOpen} title="ASSIGNEES" selected={selectedStatus} options={statusOptions}></Select>
    </div>
  )
}
