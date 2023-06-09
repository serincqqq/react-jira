import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Drawer, Modal, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PubSub from "pubsub-js";
import { SectionTitle, SearchInput, SearchInputDebounced } from "./Styles";
import Issue from "../Issue";

function NavbarModal() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const submit = () => {
    console.log("yes");
  };
  const onClose = () => {
    setSearchOpen(false);
    setCreateOpen(false);
  };
  PubSub.subscribe("modalType", (_, modalType) => {
    if (modalType.modal === "modal_search") setSearchOpen(true);
    else setCreateOpen(true);
  });
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
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
      <Modal title="Modal" open={createOpen} onOk={submit} onCancel={onClose} okText="确认" cancelText="取消">
        <Select
          defaultValue="lucy"
          style={{ width: 450 }}
          onChange={handleChange}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </Modal>
    </Fragment>
  );
}

// Modal.propTypes = propTypes;
// Modal.defaultProps = defaultProps;

export default NavbarModal;
