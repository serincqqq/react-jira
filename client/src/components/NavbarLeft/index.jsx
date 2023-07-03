import React from "react";
import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PubSub from "pubsub-js";
import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from "./Styles";

// const propTypes = {
//   issueSearchModalOpen: PropTypes.func.isRequired,
//   issueCreateModalOpen: PropTypes.func.isRequired,
// };
const issueSearchModalOpen = () => {
  PubSub.publish("modalType", { modal: "modal_search" });
};
const issueCreateModalOpen = () => {
  PubSub.publish("modalType", { modal: "modal_create" });
};
const NavbarLeft = () => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
    </LogoLink>

    <Item onClick={issueSearchModalOpen}>
      <SearchOutlined style={{ fontSize: "24px" }} />
      <ItemText>Search issues</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <PlusOutlined style={{ fontSize: "24px" }} />
      <ItemText>Create Issue</ItemText>
    </Item>
  </NavLeft>
);

// ProjectNavbarLeft.propTypes = propTypes;

export default NavbarLeft;
