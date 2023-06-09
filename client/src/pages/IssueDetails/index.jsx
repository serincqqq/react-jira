import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import PubSub from 'pubsub-js'
import { CheckSquareFilled, LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input, Button, Divider } from 'antd'
import { Title } from '../ProjectBoard/Styles'
import {
  TitleTextarea,
  Comments,
  Left,
  Right,
  Content,
  TopActions,
  Copy,
  DetailFun,
  TextFunc,
  CommentCreate,
  WarnText,
} from './Styles'
import Status from './components/Status'
import EstimateTracking from './components/EstimateTracking'
import DesEditor from './components/DesEditor'
import Comment from './components/Comment'
import Priority from './components/Priority'
import AssigneesReporter from './components/AssigneesReporter'
import { getIssueDetail, updateIssue, deleteIssue } from '@/services'
import Avatar from '@/components/Avatar'
const { TextArea } = Input

const assignees = [
  {
    id: '13252524',
    avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
  },
]
export default function IssueDetails() {
  const params = useParams()
  const [value, setValue] = useState('')
  const [content, setContent] = useState('')
  const [issueData, setIssueData] = useState()
  const [bordered, setBordered] = useState(false)
  const [link, setLink] = useState('Copy Link')
  const [create, setCreate] = useState('')
  //搜索算法，拿一下路由的参数
  const [comments, setComments] = useState([])
  const [showWarn, setShowWarn] = useState(false)
  const navigate = useNavigate()

  const init = () => {
    getIssueDetail(params.issueId).then((res) => {
      setValue(res.summary)
      setContent(res.description)
      setComments(res.comments)
      setIssueData(res)
    })
  }
  useEffect(() => {
    init()
  }, [])
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
  const deleteItem = () => {
    deleteIssue(params.issueId).then((res) => {
      if (res.code === 200) {
        navigate(-1)
        PubSub.publish('refresh')
      }
    })
  }
  const saveComment = () => {
    const date = dayjs()

    const data = {
      name: 'pinkPig',
      avatar: assignees[0].avatarUrl,
      id: assignees[0].id,
      publishTime: date.format('YYYY-MM-DD HH:mm:ss'),
      content: create,
      updatedAt: new Date(),
    }
    //要有发表评论人的头像，id，名字，时间，内容
    updateIssue(issueData._id, { ...issueData, comments: data }).then((res) =>
    //想办法补一个message弹窗
      console.log('x', res)
    )
  }
  const handleBlur = () => {
    if (value === '') {
      setShowWarn(true)
      setBordered(false)
    } else {
      setShowWarn(false)
      updateIssue(issueData._id, { ...issueData, summary: value, updatedAt: new Date() }).then(
        () => setBordered(false)
      )
    }
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
          <DeleteOutlined onClick={deleteItem} className="delete" />
        </DetailFun>
      </TopActions>
      <Content>
        <Left>
          <TitleTextarea>
            <TextArea
              placeholder="Short summary"
              className="titleText"
              bordered={bordered}
              onBlur={handleBlur}
              value={value}
              onFocus={() => setBordered(true)}
              onChange={(e) => setValue(e.target.value)}
              autoSize
            />
          </TitleTextarea>
          {showWarn ? <WarnText>This field is required</WarnText> : ''}
          <DesEditor content={content} issueData={issueData}></DesEditor>
          <Comments>
            <h4>Comments</h4>
            <CommentCreate>
              <Avatar assignees={assignees} />
              <TextArea
                className="text"
                value={create}
                onChange={(e) => setCreate(e.target.value)}
                placeholder="Add a comment"
                autoSize={{
                  minRows: 2,
                }}
              />
            </CommentCreate>
            <TextFunc>
              <Button onClick={saveComment} type="primary">
                Save
              </Button>
              <Button className="cancel">Cancel</Button>
            </TextFunc>
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </Comments>
        </Left>
        <Right>
          {issueData ? (
            <div>
              <Status issueData={issueData} />
              <AssigneesReporter type="Assignee" issueData={issueData.assignee} />
              <AssigneesReporter type="Reporter" issueData={issueData.reporter} />
              <Priority issueData={issueData} />
              <EstimateTracking />
              <Divider />
              <span>{issueData.createdAt}</span>
            </div>
          ) : (
            ''
          )}
        </Right>
      </Content>
    </>
  )
}
