import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckSquareFilled, LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { TitleTextarea, Comments, Left, Right, Content, TopActions, Copy, DetailFun } from './Styles'
import Status from './components/Status'
import EstimateTracking from './components/EstimateTracking'
import DesEditor from './components/DesEditor'
import { Title } from '../ProjectBoard/Styles'
import Create from './components/Create'
import Comment from './components/Comment'
import Priority from './components/Priority'
const { TextArea } = Input

export default function IssueDetails() {
  const params = useParams()
  const [value, setValue] = useState('Try dragging issues to different columns to transition their status.')
  const [bordered, setBordered] = useState(false)
  const [link, setLink] = useState('Copy Link')
  const [comments] = useState([
    {
      id: 1090046,
      body: "Light of the moon<br>Moves west, flowers' shadows",
      createdAt: '2023-05-17T07:09:07.584Z',
      updatedAt: '2023-05-17T07:09:07.584Z',
      userId: 405881,
      issueId: 1097639,
      user: {
        id: 405881,
        name: 'Lord Gaben',
        email: 'gaben@jira.guest',
        avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
        createdAt: '2023-05-17',
        updatedAt: '2023-05-17',
        projectId: 135048,
      },
    },
  ])
  const getUrl = () => {
    const currentUrl = window.location.href
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setLink('Link Copied')
      })
      .catch((error) => {
        console.error('复制失败', error)
      })
  }

  return (
    <>
      <TopActions>
        <Title bgColor="rgb(223, 225, 230)">
          <CheckSquareFilled style={{ color: '#4FADE6', marginRight: '8px', fontSize: '15px' }} />
          TASK-{params.issueId}
        </Title>
        <DetailFun>
          <Copy onClick={getUrl}>
            <LinkOutlined className="icon" />
            {link}
          </Copy>
          <DeleteOutlined className="delete" />
        </DetailFun>
      </TopActions>
      <Content>
        <Left>
          <TitleTextarea>
            <TextArea className="titleText" bordered={bordered} onBlur={() => setBordered(false)} value={value} onFocus={() => setBordered(true)} onChange={(e) => setValue(e.target.value)} placeholder="Autosize height with minimum and maximum number of lines" autoSize />
          </TitleTextarea>
          <DesEditor></DesEditor>
          <Comments>
            <p>Comments</p>
            <Create></Create>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </Comments>
        </Left>
        <Right>
          <Status />
          <EstimateTracking />
          <Priority />
          {/* 发现一个问题，点了一个下拉框之后再去点另一个，前一个的下拉框没有消失*/}
          {/*issue={issue} updateIssue={updateIssue}  <AssigneesReporter issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
          <Priority issue={issue} updateIssue={updateIssue} />
          
          <Dates issue={issue} /> */}
        </Right>
      </Content>
    </>
  )
}
