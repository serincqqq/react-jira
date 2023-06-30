import styled from 'styled-components'
export const Assignees = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`

export const AssigneeAvatar = styled.div`
  width: 24px;
  height: 24px;
  display: inline-block;
  margin-left: -2px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  background-image: url(${(props) => props.avatarUrl});
`
