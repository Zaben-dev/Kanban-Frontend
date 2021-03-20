import React from 'react';
import { priority, difficulty } from 'src/api/models';
import styled from 'styled-components';

const StyledTaskContainer = styled.div`
  height: 115px;
  width: 100%;
  margin-top: 12px;
  border: 3px solid #008cbaaf;
  background-color: #008cba22;
  border-radius: 4px;
`;

const StyledTaskTopbar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #008cbaaf;
  padding-left: 2px;
  height: 40px;
  font-size: 15px;
`;

const StyledAdditionalInfo = styled.div`
  display: inline-block;
  background-color: #a8e9ff5c;
  font-size: 12px;
  border-radius: 4px;
  padding: 2px 5px 2px 5px;
  margin-right: 4px;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  margin: 4px 4px 4px 4px;
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
        {title}
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
