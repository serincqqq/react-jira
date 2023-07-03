import styled, { css } from 'styled-components'

import { Link } from 'react-router-dom'
import { color, mixin, font } from '@/assets/styles/styles'

export const Issue = styled.div`
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  ${mixin.clickable}
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }
  &:hover {
    background: ${color.backgroundLight};
  }
  ${(props) =>
    props.isBeingDragged &&
    css`
      transform: rotate(3deg);
      box-shadow: 5px 10px 30px 0px rgba(9, 30, 66, 0.15);
    `}
`

export const IssueTitle = styled.p`
  padding-bottom: 11px;
  ${font.size(15)}
  @media (max-width: 1100px) {
    ${font.size(14.5)}
  }
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Assignees = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`

export const AssigneeAvatar = styled.div`
  width: 26px;
  height: 26px;
  display: inline-block;
  margin-left: -2px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  background-image: url(${(props) => props.avatarUrl});
`
export const IssueLink = styled(Link)`
  display: block;
  margin-bottom: 5px;
`
