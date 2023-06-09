import { color, font } from '@/assets/styles/styles'
import styled from 'styled-components'

export const WarnText = styled.div`
  margin: 0 0 20px 10px;
  color: red;
  font-size: 14px;
`
export const TextFunc = styled.div`
  margin: 10px 0px 0px 32px;
  .cancel {
    margin-left: 14px;
  }
`
export const CommentCreate = styled.div`
  margin-top: 10px;
  display: flex;
  .text {
    margin-left: 10px;
  }
`

export const TitleTextarea = styled.div`
  border-radius: 4px;
  transition: background 0.1s;

  &:hover:not(:focus) {
    background: ${color.backgroundLight};
  }
  .titleText {
    font-family: CircularStdMedium;
    overflow: hidden;
    ${font.size(22)}
    ${font.medium}
  }
`
export const Comments = styled.div`
  font-family: CircularStdMedium;
  margin: 20px 10px 0;
`
export const Left = styled.div`
  width: 65%;
  padding-right: 50px;
`
export const Right = styled.div`
  width: 35%;
  padding-top: 5px;
  font-family: CircularStdBold;
  color: rgb(94, 108, 132);
  ${font.size(13)};
`
export const Content = styled.div`
  display: flex;
  padding: 0 10px 40px;
`
export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 30px 2px 14px;
`
export const Copy = styled.div`
  &:hover:not(:focus) {
    background: ${color.backgroundLight};
  }
  .icon {
    margin: 2px 6px 0px;
    font-size: 18px;
  }
  cursor: pointer;
  font-family: CircularStdMedium;
  height: 34px;
  padding: 4px 10px;
  overflow: hidden;
  ${font.size(16)};
  border-radius: 4px;
  margin-right: 4px;
`
export const DetailFun = styled.div`
  position: absolute;
  right: 50px;
  top: 14px;
  display: flex;
  .delete {
    height: 30px;
    padding: 6px;
    font-size: 18px;
    &:hover:not(:focus) {
      background: ${color.backgroundLight};
    }
    cursor: pointer;
  }
`
export const SectionTitle = styled.div`
  margin: 24px 0 5px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)}
  ${font.bold}
`
