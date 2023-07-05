import styled, { css } from 'styled-components'
import { font, color } from '@/assets/styles/styles'
import { Link } from 'react-router-dom'

const commonStyles = css`
  display: flex;
  flex-direction: column;
  margin: 10px;
`
export const ProjectLink = styled(Link)`
  color: #3a86ff;
  &:hover {
    color: #3a86ff;
  }
`
export const siderStyle = {
  width: '300px',
  color: 'black',
  padding: '20px',
  backgroundColor: 'rgb(244, 245, 247)',
}
export const contentStyle = {
  padding: '20px',
  backgroundColor: 'white',
}

export const ProjectType = styled.div`
  ${commonStyles}
`
export const Type = styled.button`
  margin-top: 4px;
  display: flex;
  font-size: 16px;
  align-items: center;
  ${font.regular}
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  &:hover:not(:focus) {
    background: ${color.backgroundLight};
  }
  &:focus {
    background: ${color.backgroundLight};
  }

  .icon {
    margin-right: 10px;
    background-color: ${(props) => (props.software ? '#ffb703' : '#2684ff')};
    padding: 4px;
    border-radius: 50%;
  }
`
export const TypeLabel = styled.span``
export const PersonInfo = styled.div`
  display: flex;
`
export const PersonText = styled.div`
  margin-left: 10px;
`
