import styled from 'styled-components'

import { color, font, mixin } from '@/assets/styles/styles'
export const TrackingLink = styled.div`
  padding: 4px 4px 2px 0;
  border-radius: 4px;
  transition: background 0.1s;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`

export const ModalContents = styled.div`
  padding: 20px 25px 25px;
`

export const ModalTitle = styled.div`
  padding-bottom: 14px;
  ${font.medium}
  ${font.size(20)}
`

export const Inputs = styled.div`
  display: flex;
  margin: 20px -5px 30px;
`

export const InputCont = styled.div`
  margin: 0 5px;
  width: 50%;
`

export const InputLabel = styled.span`
  color: ${color.textMedium};
  ${font.medium};
  ${font.size(13)};
`

export const Actions = styled.div`
  display: flex;
  margin-top: 10px;
`
export const TimeBox = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  ${font.regular};
  &:hover:not(:focus) {
    background: ${color.backgroundLight};
    cursor: pointer;
  }
`
export const Logged = styled.span``
export const Estimated = styled.span`
  float: right;
`
export const Tracking = styled.div`
  width: 100%;
`
