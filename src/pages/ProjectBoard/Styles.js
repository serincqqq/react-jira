import styled, { css } from 'styled-components'

import { color, font, mixin, sizes } from '../../assets/styles/styles'

// export const List = styled.div``
// export const Title = styled.span``
// export const Issues = styled.div``
// export const Issue = styled.div``

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 5px;
  min-height: 400px;
  width: 25%;
  border-radius: 3px;
  background: #f4f5f7;
`

export const Title = styled.div`
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: #5e6c84;
  ${font.size(12.5)};
  ${mixin.truncateText}
`

export const IssuesCount = styled.span`
  text-transform: lowercase;
  margin-left: 2px;
  ${font.size(13)};
`

export const Issues = styled.div`
  height: 100%;
  padding: 0 5px;
`
