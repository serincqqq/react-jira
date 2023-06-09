import React from "react";
import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from "./Styles";

// const propTypes = {
//   issueSearchModalOpen: PropTypes.func.isRequired,
//   issueCreateModalOpen: PropTypes.func.isRequired,
// };

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
    </LogoLink>

    <Item onClick={issueSearchModalOpen}>
      <SearchOutlined style={{ fontSize: "24px" }} />
      {/* <Icon type="search" size={22} top={1} left={3} /> */}
      <ItemText>Search issues</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <PlusOutlined style={{ fontSize: "24px" }} />
      <ItemText>Create Issue</ItemText>
    </Item>
  </NavLeft>
);

// ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
