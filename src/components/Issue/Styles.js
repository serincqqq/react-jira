import styled from "styled-components";
import { color, mixin, zIndexValues, font } from "../../assets/styles/styles";

export const IssueSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  transition: background 0.1s;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const IssueData = styled.div`
  padding-left: 15px;
`;

export const IssueTitle = styled.div`
  color: ${color.textDark};
  ${font.regular}
  ${font.size(15)}
`;

export const IssueTypeId = styled.div`
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.regular};
  ${font.size(12.5)}
`;
