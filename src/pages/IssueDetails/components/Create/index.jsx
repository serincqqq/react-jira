import { Button, Input } from 'antd'
import { useState } from 'react'
import { AssigneeAvatar } from '@/components/BoardIssue/Styles'
import { TextFunc, CommentCreate } from './Styles'
const { TextArea } = Input
export default function Create() {
  const [create, setCreate] = useState('')
  return (
    <>
      <CommentCreate>
        <AssigneeAvatar avatarUrl="https://i.ibb.co/7JM1P2r/picke-rick.jpg" />
        <TextArea
          className="text"
          value={create}
          onChange={(e) => setCreate(e.target.value)}
          placeholder="Autosize height with minimum and maximum number of lines"
          autoSize={{
            minRows: 2,
          }}
        />
      </CommentCreate>
      <TextFunc style={{}}>
        <Button type="primary">Save</Button>
        <Button className="cancel">Cancel</Button>
      </TextFunc>
    </>
  )
}
