import { AssigneeAvatar } from '@/components/BoardIssue/Styles'
import { Content, CommentItem, UserInfo, BodyForm } from './Styles'
export default function Comment({ comment }) {
  return (
    <CommentItem>
      <Content>
        {/* <AssigneeAvatar avatarUrl={comment.user.avatarUrl} /> */}
        <AssigneeAvatar></AssigneeAvatar>
        <UserInfo>{comment.user.name}</UserInfo>
        <UserInfo>{comment.user.updatedAt}</UserInfo>
      </Content>
      <BodyForm>{comment.body}</BodyForm>
    </CommentItem>
  )
}
