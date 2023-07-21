import React from 'react'
import { nanoid } from 'nanoid'
import 'react-quill/dist/quill.snow.css'
import { Select, Space } from 'antd'

const { Option } = Select
export default function SpaceOption({ options, onChange }) {
  return (
    <Select onChange={onChange} optionLabelProp="label" placeholder="please select an option">
      {options.map((item) => {
        return (
          <Option
            key={nanoid()}
            value={item.label}
            label={
              <Space>
                {item.icon}
                {item.label}
              </Space>
            }
          >
            <Space>
              {item.icon}
              {item.label}
            </Space>
          </Option>
        )
      })}
    </Select>
  )
}
