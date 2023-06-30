import { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import Icon, { DownOutlined } from '@ant-design/icons'
import {
  ARSelect,
  StyledSelect,
  ValueContainer,
  Options,
  OptionsItem,
  Option,
  PrioritySelect,
  IconStyle,
  avatarLabel,
} from './Styles'
function Priority({ selected }) {
  return (
    <PrioritySelect color={selected.key}>
      <IconStyle priority={selected.key}>
        <Icon component={selected.icon} />
      </IconStyle>
      <ValueContainer>{selected.label}</ValueContainer>
    </PrioritySelect>
  )
}
function Status({ selected }) {
  return (
    <StyledSelect color={selected.key}>
      <ValueContainer>{selected.label}</ValueContainer>
      <DownOutlined />
    </StyledSelect>
  )
}
function AssigneesReporter({ selected }) {
  return (
    <ARSelect color={selected.key}>
      <Avatar assignees={selected.avatar} />
      <ValueContainer style={avatarLabel}>{selected.label}</ValueContainer>
    </ARSelect>
  )
}
function createChildComponent(type, data) {
  //console.log('type', type, data)
  switch (type) {
    case 'priority':
      return <Priority selected={data} />
    case 'status':
      return <Status selected={data} />
    case 'assignees':
      return <AssigneesReporter selected={data} />
    default:
      return null // 未知类型，返回空
  }
}
function ItemTag(type, item) {
  switch (type) {
    case 'priority':
      return (
        <IconStyle priority={item.key}>
          <Icon component={item.icon} />
        </IconStyle>
      )
    case 'assignees':
      return <Avatar style={{ marginRight: '10px' }} assignees={item.avatar} />
    default:
      return null // 未知类型，返回空
  }
}
export default function Select({ name, isDrawerOpen, title, options, selected, select }) {
  return (
    <>
      <p style={{ margin: '8px 0' }}>{title}</p>
      {createChildComponent(name, selected)}

      {isDrawerOpen ? (
        <Options>
          {options.map((item) => (
            <Option onClick={(e) => select(item, e)} key={item.key}>
              <OptionsItem name={name} color={item.key}>
                {ItemTag(name, item)}
                {item.label}
              </OptionsItem>
            </Option>
          ))}
        </Options>
      ) : null}
    </>
  )
}
