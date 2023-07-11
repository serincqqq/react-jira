import styled, { css } from 'styled-components'
import {
  issueStatusColors,
  issueStatusBackgroundColors,
  issuePriorityColors,
} from '@/assets/styles/styles'
import { color, font } from '@/assets/styles/styles'

export const StyledSelect = styled.div`
  padding: 4px 6px;
  background-color: ${(props) => issueStatusBackgroundColors[props.color]};
  color: ${(props) => issueStatusColors[props.color]};
  display: inline-flex;
  border-radius: 4px;
  align-items: center;
  display: inline-flex;
  border-radius: 4px;
  text-transform: uppercase;
  /* &:hover {
    transform: scale(1.1);
  } */
`
export const PrioritySelect = styled.div`
  color: ${color.textDarkest};
  padding: 2px 8px;
  display: flex;
  align-items: center;
  font-size: 15px;
  ${font.regular}
`
export const ARSelect = styled.div`
  display: inline-flex;
  color: ${color.textDarkest};
  ${font.regular}
  font-size: 15px;
  margin: 0px 10px 5px 0px;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgb(235, 236, 240);
`

export const ValueContainer = styled.p`
  margin-top: 2px;

  margin-right: 6px;
`
export const Options = styled.div`
  margin-bottom: 10px;
  position: absolute;
  width: 300px;
  z-index: 10;
  border-radius: 0px 0px 4px 4px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
`
export const Option = styled.div`
  width: 100%;
  height: 36px;

  &:hover {
    background-color: rgb(210, 229, 254);
  }
`
export const OptionsItem = styled.div`
  height: 25px;
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.name !== 'status' &&
    css`
      font-size: 15px;
      color: ${color.textDarkest};
      margin: 4px 2px;
      ${font.regular}
    `}
  ${(props) =>
    props.name === 'status' &&
    css`
      color: ${(props) => issueStatusColors[props.color]};
      background-color: ${(props) => issueStatusBackgroundColors[props.color]};
      text-transform: uppercase;
      margin: 6px 14px;
    `};
`

export const IconStyle = styled.div`
  margin-right: 10px;
  font-size: 14px;
  line-height: 18px;
  color: ${(props) => issuePriorityColors[props.priority]};
`
export const avatarLabel = {
  marginLeft: '10px',
}
