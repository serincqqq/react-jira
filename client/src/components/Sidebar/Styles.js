import styled from 'styled-components'

import { font } from '@/assets/styles/styles'

export const ProjectInfo = styled.div`
  @media (max-width:1000px) {
    display: none;
  }
  height: 100vh;
  width: 230px;
  background-color: #f4f5f7;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 64px;
  padding: 0 16px 24px;
  ${font.bold}
  ${font.size(11.5)}
`
export const ProjectAvatar = styled.div`
  display: inline-block;
  width: 48px;
  height: 48px;
  background-image: url(https://i.ibb.co/7JM1P2r/picke-rick.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ebecf0;
`
export const ProjectTitle = styled.span`
  color: #42526e;
  font-size: 15px;
  font-family: 'CircularStdMedium';
  font-weight: normal;
  ${font.size(18)};
`
export const ProjectTexts = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 10px;
`

export const ProjectDes = styled.span`
  color: #5e6c84;
  ${font.size(14)};
  font-family: 'CircularStdBook';
`

export const ProjectFunc = styled.div`
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
`

export const ProjectHeader = styled.div`
  display: flex;
  padding: 24px 4px;
`
export const LinkItem = styled.div`
  position: relative;
  display: flex;
  padding: 10px 12px;
  border-radius: 6px;
  &:hover {
    background: #ebecf0;
  }
  i {
    margin-right: 15px;
    font-size: 20px;
  }
  &.active {
    color: #0052cc;
    background: #ebecf0;
  }
`

export const LinkText = styled.div`
  ${font.size(15)};
  font-family: 'CircularStdBook';
`
