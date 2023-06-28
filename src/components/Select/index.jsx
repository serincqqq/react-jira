import { useState, useEffect } from 'react'
//import { Icon } from 'antd'
import Icon, { DownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { StyledSelect, ValueContainer, Options, OptionsItem, Option, PrioritySelect, IconStyle } from './Styles'
export default function Select({ name, isDrawerOpen, title, options, selected, onClick, select }) {
  const handelChange = (e) => {
    //在这里要触发父组件的方法
    onClick(e)
  }
  // 难点，根据传来的icon显示，而且一个的icon在前一个在后
  return (
    <>
      <p style={{ margin: '8px 0' }}>{title}</p>
      {name === 'priority' ? (
        <PrioritySelect color={selected.key} onClick={handelChange}>
          <IconStyle priority={selected.key}>
            <Icon component={selected.icon} />
          </IconStyle>
          <ValueContainer>{selected.label}</ValueContainer>
        </PrioritySelect>
      ) : (
        <StyledSelect color={selected.key} onClick={handelChange}>
          <ValueContainer>{selected.label}</ValueContainer>
          <DownOutlined />
        </StyledSelect>
      )}

      {isDrawerOpen ? (
        <Options>
          {options.map((item) => (
            <Option onClick={(e) => select(item, e)} key={item.key}>
              {name === 'priority' ? <span>11</span> : ''}
              <OptionsItem name={name} color={item.key}>
                {item.label}
              </OptionsItem>
            </Option>
          ))}
        </Options>
      ) : null}
    </>
  )
}
