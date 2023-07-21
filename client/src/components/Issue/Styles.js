import styled from 'styled-components'
import { color, mixin, font } from '@/assets/styles/styles'
import { Link } from 'react-router-dom'

export const IssueSearch = styled(Link)`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  transition: background 0.1s;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`

export const IssueData = styled.div`
  padding-left: 15px;
`

export const IssueTitle = styled.div`
  color: ${color.textDark};
  ${font.regular}
  ${font.size(15)}
`

export const IssueTypeId = styled.div`
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.regular};
  ${font.size(12.5)}
`
