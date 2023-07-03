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
        <UserInfo>{comment.user.name}</UserInfo>
        <UserInfo>{comment.user.updatedAt}</UserInfo>
      </Content>
      <BodyForm>{comment.body}</BodyForm>
    </CommentItem>
  )
}
