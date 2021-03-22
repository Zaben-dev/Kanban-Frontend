import React from 'react';
import styled from 'styled-components';
import { ColumnData } from 'src/api/models';
import ColumnMenuContainer from 'src/components/containers/ColumnMenuContainer';
import TasksAreaContainer from 'src/components/containers/TasksAreaContainer';
import currentColumnIdContext from 'src/contexts/currentColumnIdContext';

const StyledContainer = styled.div`
  background-color: #008cba2a;
  color: #1a1a1a;
  min-width: 240px;
  height: 88vh;
  margin-left: 20px;
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
  height: 25px;
`;

const StyledName = styled.div`
  padding-left: 9px;
  margin-top: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 400;
`;

const StyledLimit = styled.div`
  display: inline-block;
  background-color: #a8e9ff5c;
  font-size: 13px;
  border-radius: 4px;
  padding: 2px 5px 2px 5px;
  margin-left: 9px;
  margin-top: 5px;
`;

const Column: React.FunctionComponent<ColumnData> = ({ id, name, limit }) => {
  return (
    <StyledContainer>
      <StyledFlexContainer>
        <StyledName>
          {name}
          &nbsp;
        </StyledName>
        <currentColumnIdContext.Provider value={{ id }}>
          <ColumnMenuContainer />
        </currentColumnIdContext.Provider>
      </StyledFlexContainer>
      <StyledLimit>max: {limit}</StyledLimit>
      <currentColumnIdContext.Provider value={{ id }}>
        <TasksAreaContainer />
      </currentColumnIdContext.Provider>
    </StyledContainer>
  );
};

export default Column;
