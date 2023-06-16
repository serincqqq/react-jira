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
  margin: 10px 6px 10px;
  padding: 4px;
  border-radius: 6px;
  width: 130px;
  text-transform: uppercase;
  color: #5e6c84;
  ${font.size(14)};
  ${mixin.truncateText};

  &:hover {
    background: ${(props) => (props.bgColor ? props.bgColor : '')};
  }
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
export const Nav = styled.div`
  display: flex;
  font-family: CircularStdBook;
  color: rgb(94, 108, 132);
  font-size: 16px;
  margin-bottom: 10px;
`
export const Divider = styled.span`
  position: relative;
  margin: 0 10px;
  ${font.size(18)};
`
