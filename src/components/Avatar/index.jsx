import { Assignees, AssigneeAvatar } from './Styles'
export default function Avatar({ assignees }) {
  return (
    <Assignees>
      {Array.isArray(assignees) ? (
        assignees.map((user) => <AssigneeAvatar key={user.id} avatarUrl={user.avatarUrl} />)
      ) : (
        <AssigneeAvatar avatarUrl={assignees} />
      )}
    </Assignees>
  )
}
