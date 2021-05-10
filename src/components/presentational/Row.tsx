import React from 'react';
import styled from 'styled-components';
import RenderTasks from 'src/components/logic/RenderTasks';
import currentRowIdContext from 'src/contexts/currentRowIdContext';
import DropdownMenu from 'src/components/logic/DropdownMenu';
import RowMenu from 'src/components/presentational/menus/RowMenu';

const StyledRowContainer = styled.div`
  margin-bottom: 8px;
  max-width: 263px;
  margin-left: auto;
  margin-right: auto;
  min-height: 140px;
  margin-left: 2px;
  background-color: rgba(20, 158, 66, 0.281);
  border-radius: 3px;
  border: 3px solid #0041572e;
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

interface Props {
  key: number;
  index: number;
  id: number;
  name: string;
}

const Row: React.FC<Props> = ({ index, id, name }) => {
  return (
    <StyledRowContainer>
      <currentRowIdContext.Provider value={{ id }}>
        <StyledFlexContainer>
          <StyledName>
            {name}
            &nbsp;
          </StyledName>
          <DropdownMenu MenuType={RowMenu} />
        </StyledFlexContainer>
        <RenderTasks />
      </currentRowIdContext.Provider>
    </StyledRowContainer>
  );
};

export default Row;
