import { useState, useEffect, Fragment } from 'react'
import Select from '@/components/Select'
export default function Status() {
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
  const selectStatus = (item, e) => {
    stopPropagation(e)
    setSelectedStatus(item)
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <Fragment>
      <Select name="status" select={selectStatus} onClick={changeStatus} isDrawerOpen={isDrawerOpen} title="STATUS" selected={selectedStatus} options={statusOptions}></Select>
      {/* <p>STATUS</p>
      <StyledSelect color={selectedStatus.key} onClick={changeStatus}>
        <ValueContainer>{selectedStatus.label}</ValueContainer>
        <DownOutlined style={{ color: selectedStatus.key === 'done' || selectedStatus.key === 'inprogress' ? '#fff' : '#42526E' }} />
      </StyledSelect>
      {isDrawerOpen ? (
        <Options>
          {statusOptions.map((item) => (
            <Option onClick={(e) => select(item, e)} key={item.key}>
              <OptionsItem color={item.key}>{item.label}</OptionsItem>
            </Option>
          ))}
        </Options>
      ) : null} */}
    </Fragment>
  )
}
