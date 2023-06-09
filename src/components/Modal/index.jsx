import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Drawer, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PubSub from "pubsub-js";
import { SectionTitle, SearchInput, SearchInputDebounced } from "./Styles";
import Issue from "../Issue";

function Modal() {
  const size = "700px";
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const onClose = () => {
    setSearchOpen(false);
    setCreateOpen(false);
  };
  PubSub.subscribe("modalType", (_, modalType) => {
    if (modalType.modal === "modal_search") setSearchOpen(true);
    else setCreateOpen(true);
  });
  return (
    <Fragment>
      <Drawer style={{ width: "520px" }} placement="left" closable={false} onClose={onClose} open={searchOpen}>
        <SearchInput>
          <SearchOutlined style={{ fontSize: "22px", marginTop: "2px" }} />
          <SearchInputDebounced placeholder="Search issues by summary, description..."></SearchInputDebounced>
        </SearchInput>
        <SectionTitle>Recent Issues</SectionTitle>
        <Issue></Issue>
      </Drawer>
      <Drawer title="Basic Drawer" placement="left" closable={false} onClose={onClose} open={createOpen}>
        <p>Some contents...</p>
      </Drawer>
    </Fragment>
  );
}

// Modal.propTypes = propTypes;
// Modal.defaultProps = defaultProps;

export default Modal;
