import styled, { css } from 'styled-components'

import { color, mixin, zIndexValues, font } from '../../assets/styles/styles'
//import Icon from "";
export const ProjectInfo = styled.div`
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
  width: 50px;
  height: 50px;
  background-image: url(https://i.ibb.co/7JM1P2r/picke-rick.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ebecf0;
`
export const ProjectTitle = styled.input`
  width: 100%;
  padding: 0 0 0 10px;
  border: none;
  background: #fff;
  ${font.size(21)}
`
export const ProjectDes = styled.div`
  z-index: ${zIndexValues.modal};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${mixin.scrollableY}
`

export const ProjectFunc = styled.div`
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
  ${(props) => clickOverlayStyles[props.variant]}
`

const clickOverlayStyles = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `,
  aside: '',
}

export const ProjectHeader = styled.div`
  display: flex;
  padding: 24px 4px;
`

const modalStyles = {
  center: css`
    max-width: ${(props) => props.width}px;
    vertical-align: middle;
    border-radius: 3px;
    ${mixin.boxShadowMedium}
  `,
  aside: css`
    min-height: 100vh;
    max-width: ${(props) => props.width}px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  `,
}
