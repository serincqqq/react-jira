import { useState } from 'react'
import { CheckSquareFilled } from '@ant-design/icons'
import '@wangeditor/editor/dist/css/style.css'
import { Input } from 'antd'
import { useParams } from 'react-router-dom'
import DesEditor from './components/DesEditor'
import { Title } from '../ProjectBoard/Styles'
const { TextArea } = Input

export default function IssueDetails() {
  const params = useParams()
  const [value, setValue] = useState(params.issueId)

  return (
    <>
      <Title bgColor="rgb(223, 225, 230)">
        <CheckSquareFilled style={{ color: '#4FADE6', marginRight: '8px', fontSize: '15px' }} />
        TASK-{params.issueId}
      </Title>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
      />
      <DesEditor></DesEditor>
    </>
  )
}
