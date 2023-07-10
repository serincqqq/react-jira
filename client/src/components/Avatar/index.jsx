import { Assignees, AssigneeAvatar } from './Styles'
export default function Avatar({ assignees }) {
  const assigneesType = Array.isArray(assignees)
  return (
    <Assignees style={assigneesType ? {} : { marginRight: '10px' }}>
      {assigneesType ? (
        assignees.map((user) => <AssigneeAvatar key={user.id} avatarUrl={user.avatarUrl} />)
      ) : (
        <AssigneeAvatar avatarUrl={assignees.avatarUrl} />
      )}
    </Assignees>
  )
}
