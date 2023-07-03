import { CheckSquareFilled } from "@ant-design/icons";
import React from "react";
import { IssueTitle, IssueSearch, IssueData, IssueTypeId } from "./Styles";
export default function Issue() {
  return (
    <IssueSearch>
      <CheckSquareFilled style={{ fontSize: "22px", color: "#4FADE6" }} />
      <IssueData>
        <IssueTitle>Try leaving a comment on this issue</IssueTitle>
        <IssueTypeId>task-1097641</IssueTypeId>
      </IssueData>
    </IssueSearch>
  );
}
