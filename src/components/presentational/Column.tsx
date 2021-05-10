import React from 'react';
import styled from 'styled-components';
import { ColumnData } from 'src/api/models';
import DropdownMenu from 'src/components/logic/DropdownMenu';
import ColumnMenu from 'src/components/presentational/menus/ColumnMenu';
import RenderRows from 'src/components/logic/rows/RenderRows';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';
import { Infinity } from '@styled-icons/octicons/Infinity';

const StyledContainer = styled.div`
  background-color: #008cba2a;
  overflow: hidden;
  color: #1a1a1a;
  min-width: 283px;
  max-width: 283px;
  height: 89.5vh;
  margin-left: 15px;
  animation: fadein 1s;
  border: 4px solid #0041572e;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 60px;
`;

const StyledName = styled.div`
  max-height: 60px;
  padding-left: 9px;
  margin-top: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 400;
  word-break: break-word;
`;

const StyledLimit = styled.div`
  display: inline-block;
  background-color: #88c5da5c;
  font-size: 14px;
  border-radius: 4px;
  padding: 2px 5px 2px 5px;
  margin-left: 6px;
  margin-top: 5px;
`;

const StyledInfinityIcon = styled(Infinity)`
  padding-bottom: 1px;
  color: #1a1a1a;
`;

const Column: React.FunctionComponent<ColumnData> = ({ id, name, limit }) => {
  return (
    <currentColumnIdContext.Provider value={{ id }}>
      <StyledContainer>
        <StyledFlexContainer>
          <StyledName>
            {name}
            &nbsp;
          </StyledName>
          <DropdownMenu MenuType={ColumnMenu} />
        </StyledFlexContainer>
        <StyledLimit>
          max: {limit === null ? <StyledInfinityIcon size="18" /> : limit}
        </StyledLimit>
        <RenderRows />
      </StyledContainer>
    </currentColumnIdContext.Provider>
  );
};

export default Column;
