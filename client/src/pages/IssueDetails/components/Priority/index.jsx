import { useState, useEffect, useRef } from 'react'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import Select from '@/components/Select'
import './Styles.css'
import { updateIssue } from '@/services'
export default function Priority({ issueData }) {
  const ref = useRef(null)
  const priorityOptions = [
    {
      label: 'Highest',
      key: 'Highest',
      icon: ArrowUpOutlined,
    },
    {
      label: 'High',
      key: 'High',
      icon: ArrowUpOutlined,
    },
    {
      label: 'Medium',
      key: 'Medium',
      icon: ArrowUpOutlined,
    },
    {
      label: 'Low',
      key: 'Low',
      icon: ArrowDownOutlined,
    },
    {
      label: 'Lowest',
      key: 'Lowest',
      icon: ArrowDownOutlined,
    },
  ]
  const temp = priorityOptions.find((item) => item.key === issueData.priority.key)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState(temp)

  useEffect(() => {
    document.addEventListener('click', (e) => changeStatus(e))
    return () => {
      document.removeEventListener('click', (e) => changeStatus(e))
    }
  })
  const changeStatus = (e) => {
    if (!ref.current?.contains(e.target)) {
      setIsDrawerOpen(false)
    } else {
      setIsDrawerOpen(true)
    }
  }
  const selectPriority = (item, e) => {
    updateIssue(issueData._id, { ...issueData, priority: item, updatedAt: new Date() }).then(
      (res) => setSelectedPriority(item)
    )
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <div ref={ref}>
      <Select
        name="priority"
        select={selectPriority}
        onClick={changeStatus}
        isDrawerOpen={isDrawerOpen}
        title="PRIORITY"
        selected={selectedPriority}
        options={priorityOptions}
      ></Select>
    </div>
  )
}
