import { useState, useEffect, useRef } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import Select from '@/components/Select'
import './Styles.css'
export default function Priority() {
  const priorityOptions = [
    {
      label: 'Highest',
      key: 'Highest',
    },
    {
      label: 'High',
      key: 'High',
    },
    {
      label: 'Medium',
      key: 'Medium',
    },
    {
      label: 'Low',
      key: 'Low',
    },
    {
      label: 'Lowest',
      key: 'Lowest',
    },
  ]
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState({
    label: 'Medium',
    key: 'Medium',
    icon: ArrowUpOutlined,
  })

  useEffect(() => {
    document.addEventListener('click', (e) => setIsDrawerOpen(false))
  }, [])
  const stopPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }
  const changeStatus = (e) => {
    // 使用 react 的 e.stopPropagation 不能阻止冒泡，需要使用 e.nativeEvent.stopImmediatePropagation，这里我们对其进行封装，方便多次调用
    stopPropagation(e)
    setIsDrawerOpen(!isDrawerOpen)
  }
  const selectPriority = (item, e) => {
    stopPropagation(e)
    setSelectedPriority(item)
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <>
      <Select name="priority" select={selectPriority} onClick={changeStatus} isDrawerOpen={isDrawerOpen} title="PRIORITY" selected={selectedPriority} options={priorityOptions}></Select>
    </>
  )
}
