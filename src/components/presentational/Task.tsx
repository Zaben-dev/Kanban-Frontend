import React from 'react';
import { priority, difficulty } from 'src/api/models';
import TaskMenu from 'src/components/containers/TaskMenuContainer';
import styled from 'styled-components';

const StyledTaskContainer = styled.div`
  height: 115px;
  width: 100%;
  margin-top: 12px;
  border: 3px solid #008cbaaf;
  background-color: #008cba22;
  border-radius: 4px;
  overflow: hidden;
`;

const StyledTaskTopbar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #008cbaaf;
  color: #373810;
  padding-left: 2px;
  height: 41px;
  font-size: 15px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  line-height: 1.3;
`;

const StyledAdditionalInfo = styled.div`
  display: inline-block;
  background-color: #a8e9ff5c;
  font-size: 11px;
  border-radius: 4px;
  padding: 2px 4px 2px 4px;
  margin-right: 4px;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  margin: 4px 4px 4px 4px;
  word-break: break-all;
  hyphens: auto;
`;

interface Props {
  title: string;
  description: string;
  priority: priority;
  difficulty: difficulty;
}

const Task: React.FunctionComponent<Props> = ({
  title,
  description,
  priority,
  difficulty,
}) => {
  return (
    <StyledTaskContainer>
      <StyledTaskTopbar>
        <StyledFlexContainer>
          <div>{title}</div>
          <TaskMenu />
        </StyledFlexContainer>
        <div>
          <StyledAdditionalInfo>priority: {priority}</StyledAdditionalInfo>
          <StyledAdditionalInfo>difficulty: {difficulty}</StyledAdditionalInfo>
        </div>
      </StyledTaskTopbar>
      <StyledDescription>{description}</StyledDescription>
    </StyledTaskContainer>
  );
};

export default Task;
