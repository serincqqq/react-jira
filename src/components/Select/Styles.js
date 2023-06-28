import styled, { css } from 'styled-components'
import { issueStatusColors, issueStatusBackgroundColors, issuePriorityColors } from '@/assets/styles/styles'
import { color, mixin, font } from '@/assets/styles/styles'

export const StyledSelect = styled.div`
  font-family: CircularStdMedium;
  padding: 4px 12px 2px;
  background-color: ${(props) => issueStatusBackgroundColors[props.color]};
  color: ${(props) => issueStatusColors[props.color]};
  display: inline-flex;
  border-radius: 4px;
  align-items: center;
  display: inline-flex;
  border-radius: 4px;
  text-transform: uppercase;
  &:hover {
    transform: scale(1.1);
  }
`
export const ValueContainer = styled.p`
  margin-top: 2px;
  font-size: 14px;
  margin-right: 6px;
`
export const Options = styled.div`
  border-radius: 0px 0px 4px 4px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
`
export const Option = styled.div`
  width: 100%;
  height: 36px;
  ${font.regular}
  &:hover {
    background-color: rgb(210, 229, 254);
  }
`
export const OptionsItem = styled.div`
  margin: 6px 14px;
  height: 24px;

  padding: 2px 8px;
  display: inline-flex;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.name === 'priority' &&
    css`
      color: black;
    `};
  ${(props) =>
    props.name !== 'priority' &&
    css`
      color: ${(props) => issueStatusColors[props.color]};
      background-color: ${(props) => issueStatusBackgroundColors[props.color]};
      text-transform: uppercase;
    `};
`
export const PrioritySelect = styled.div`
  padding: 2px 8px;
  display: flex;
  ${font.regular}
`

export const IconStyle = styled.div`
  color: black;
  font-size: 14px;
  line-height: 18px;
  margin-right: 10px;
  color: ${(props) => issuePriorityColors[props.priority]};
`
