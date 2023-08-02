import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { font, sizes, color, mixin, zIndexValues } from '@/assets/styles/styles'
import Logo from '../Logo'

export const UserAvatar = styled.div`
  height: 24px;
  flex-shrink: 0;
  width: 24px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.avatar});
  display: inline-block;
`
export const NavLeft = styled.aside`
  z-index: ${zIndexValues.navLeft};
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
  width: ${sizes.appNavBarLeftWidth}px;
  background: ${color.backgroundDarkPrimary};
  transition: all 0.1s;
  ${mixin.hardwareAccelerate}
  &:hover {
    width: ${sizes.secondarySideBarWidth}px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
  }
`

export const LogoLink = styled(NavLink)`
  display: block;
  position: relative;
  left: 0;
  margin: 20px 0 10px;
  transition: left 0.1s;
`

export const StyledLogo = styled(Logo)`
  display: inline-block;
  margin-left: 8px;
  padding: 10px;
  ${mixin.clickable}
`

export const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
`

export const Item = styled.div`
  display: flex;
  height: 38px;
  align-items: center;
  line-height: 30px;
  margin-bottom: 10px;
  padding: 6px 0 0 20px;
  color: #deebff;
  transition: color 0.1s;
  ${mixin.clickable}
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export const ItemText = styled.div`
  margin-left: 14px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;
  ${font.bold}
  ${font.size(12)}
  ${NavLeft}:hover & {
    right: 0;
    visibility: visible;
    opacity: 1;
  }
`
