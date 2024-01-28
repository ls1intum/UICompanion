import React from 'react';
import { Type } from 'react-figma-ui';
import { Link } from 'react-router-dom';
import {GithubIssue} from "@repo/shared";

type IssueListItemProps = {
  issue: GithubIssue;
};

const IssueListItem = (props: IssueListItemProps) => {
  return (
    <Link to={`/detail/${props.issue.number}`} style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '10px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: '#333333',
      textDecoration: 'none',
    }}>

      {/* Issue Number */}
      <Type size="small" weight="medium" style={{ color: '#B2B2B2' }}>
        {`#${props.issue.number}`}
      </Type>

      {/* Issue Title */}
      <Type
        size="large"
        weight="bold"
        style={{
          fontWeight: '600',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {props.issue.title}
      </Type>
    </Link>
  );
};

export default IssueListItem;
