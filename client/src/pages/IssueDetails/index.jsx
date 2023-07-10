import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { CheckSquareFilled, LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
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
} from './Styles'
import Status from './components/Status'
import EstimateTracking from './components/EstimateTracking'
import DesEditor from './components/DesEditor'
import Create from './components/Create'
import Comment from './components/Comment'
import Priority from './components/Priority'
import AssigneesReporter from './components/AssigneesReporter'
import { getIssueDetail, updateIssue } from '@/services'
import Avatar from '@/components/Avatar'
const { TextArea } = Input

export default function IssueDetails() {
  const params = useParams()
  const [value, setValue] = useState('')
  const [content, setContent] = useState('')
  const [issueData, setIssueData] = useState()
  const [bordered, setBordered] = useState(false)
  const [link, setLink] = useState('Copy Link')
  const assignees = [
    {
      id: '13252524',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
  ]
  const [create, setCreate] = useState('')
  //搜索算法，拿一下路由的参数
  const [comments, setComments] = useState([])
  const init = () => {
    getIssueDetail(params.issueId).then((res) => {
      setValue(res.issuename)
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
  const deleteIssue = () => {
    deleteIssue(params.issueId).then((res) => {
      //插入提示删除成功的message
      console.log('r', res)
    })
    console.log('xx')
  }
  const saveComment = () => {
    const date = dayjs()

    const data = {
      name: 'pinkPig',
      avatar: assignees[0].avatarUrl,
      id: assignees[0].id,
      publishTime: date.format('YYYY-MM-DD HH:mm:ss'),
      content: create,
    }
    console.log('create', { ...issueData, comments: data })
    //要有发表评论人的头像，id，名字，时间，内容
    updateIssue(issueData._id, { ...issueData, comments: data }).then((res) =>
      console.log('x', res)
    )
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
          <DeleteOutlined onClick={deleteIssue} className="delete" />
        </DetailFun>
      </TopActions>
      <Content>
        <Left>
          <TitleTextarea>
            <TextArea
              className="titleText"
              bordered={bordered}
              onBlur={() => setBordered(false)}
              value={value}
              onFocus={() => setBordered(true)}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Autosize height with minimum and maximum number of lines"
              autoSize
            />
          </TitleTextarea>
          <DesEditor content={content} issueData={issueData}></DesEditor>
          <Comments>
            <p>Comments</p>
            {/* <Create></Create> */}
            <CommentCreate>
              <Avatar assignees={assignees} />
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
          <Status />
          <EstimateTracking />
          <Priority />
          <AssigneesReporter type="Assignee" issueData={issueData?.assignee} />
          <AssigneesReporter type="Reporter" issueData={issueData?.reporter} />
        </Right>
      </Content>
    </>
  )
}
