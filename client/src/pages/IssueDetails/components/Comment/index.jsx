import Avatar from '@/components/Avatar'
import { Content, CommentItem, UserInfo, BodyForm } from './Styles'
export default function Comment({ comment }) {
  const assignees = [
    {
      id: '1',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    },
  ]

  return (
    <CommentItem>
      <Content>
        <Avatar assignees={assignees} />
        <UserInfo>{comment.name}</UserInfo>
        <UserInfo>{comment.publishTime}</UserInfo>
      </Content>
      <BodyForm>{comment.content}</BodyForm>
    </CommentItem>
  )
}
