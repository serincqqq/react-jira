import { useState, useEffect, useRef } from 'react'
import Select from '@/components/Select'
export default function Status() {
  const assigneesRef = useRef(null)
  const statusOptions = [
    {
      label: 'Lisa',
      key: 'Lisa',
      avatar: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
    {
      label: 'Evan',
      key: 'Evan',
      avatar: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
    {
      label: 'Anna',
      key: 'Anna',
      avatar: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
    {
      label: 'Serin',
      key: 'Serin',
      avatar: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
  ]
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState({
    label: 'Serin',
    key: 'Serin',
    //key暂时以名字做标记，但是之后的话需要生成每个人唯一的id作为标记
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
        name="assignees"
        select={selectStatus}
        onClick={changeStatus}
        isDrawerOpen={isDrawerOpen}
        title="ASSIGNEES"
        selected={selectedStatus}
        options={statusOptions}
      ></Select>
    </div>
  )
}
